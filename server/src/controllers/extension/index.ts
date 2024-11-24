const getSnap = require("../../services/getSnap");
const uploadImageS3 = require("../../services/uploadImageS3");
const supabase = require("../../services/supabaseClient");

interface Note {
  content: string;
  related_images?: string[];
  related_links?: string[];
  related_codes?: string[];
}

interface SnapInterface {
  summary: string;
  title: string;
  thumbnail: string;
  sourceUrl: string;
  user_email: string;
  tags: string[];
  notes: Note[];
}

const storeData = async (req: any, res: any) => {
  try {
    const { url, pageContent, email, username, screenshot } = req.body;

    if (!url || !pageContent || !email || !screenshot || !username) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Upload screenshot to S3 and get the image key
    const imageKey = await uploadImageS3(screenshot);
    console.log("Image key: ", imageKey);

    // Get snap data
    const snapData = await getSnap(pageContent);
    console.log("Snap data: ", snapData);

    const snap: SnapInterface = {
      summary: snapData.summary,
      title: snapData.title,
      thumbnail: imageKey,
      sourceUrl: url,
      user_email: email,
      tags: snapData.tags,
      notes: snapData.notes,
    };
    console.log("Snap: ", snap);

    // Check if the user exists
    const { data: user, error: userError } = await supabase
      .from("user")
      .select("*")
      .eq("user_email", email)
      .single();

    if (userError && userError.code !== "PGRST116") {
      console.error("Error checking user:", userError);
      return res.status(500).json({ error: "Error checking user" });
    }

    let userId = user?.id;

    // If user doesn't exist, create one
    if (!user) {
      const { data: newUser, error: createUserError } = await supabase
        .from("user")
        .insert({ user_email: email, user_name: username })
        .select("*")
        .single();

      if (createUserError) {
        console.error("Error creating user:", createUserError);
        return res.status(500).json({ error: "Error creating user" });
      }

      userId = newUser.id;
    }

    // Check if the snap with the same sourceUrl exists for the user
    const { data: existingSnap, error: snapError } = await supabase
      .from("snap")
      .select("*")
      .eq("source_link", url)
      .eq("user_email", email)
      .single();

    if (snapError && snapError.code !== "PGRST116") {
      console.error("Error checking snap:", snapError);
      return res.status(500).json({ error: "Error checking snap" });
    }

    if (existingSnap) {
      return res.status(409).json({ message: "Snap already exists" });
    }

    // Insert the new snap
    const { data: newSnap, error: createSnapError } = await supabase
      .from("snap")
      .insert({
        title: snap.title,
        thumbnail: snap.thumbnail,
        summary: snap.summary,
        source_link: snap.sourceUrl,
        user_email: snap.user_email,
      })
      .select("*")
      .single();

    if (createSnapError) {
      console.error("Error creating snap:", createSnapError);
      return res.status(500).json({ error: "Error creating snap" });
    }

    // Insert related notes
    for (const note of snap.notes) {
      const { error: noteError } = await supabase.from("note").insert({
        content: note.content,
        related_images: note.related_images,
        related_links: note.related_links,
        related_codes: note.related_codes,
        snap_id: newSnap.id,
      });

      if (noteError) {
        console.error("Error creating note:", noteError);
        return res.status(500).json({ error: "Error creating note" });
      }
    }

    res.status(201).json({ message: "Snap and notes stored successfully" });
  } catch (err) {
    console.error("Error in storeData:", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

module.exports = {
  storeData,
};
