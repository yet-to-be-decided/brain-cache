const supabase = require("./supabaseClient");

module.exports = async (base64Image) => {
  try {
    // Remove Base64 prefix
    const base64Data = base64Image.split(",")[1];
    const binaryData = Buffer.from(base64Data, "base64");

    const fileName = `uploads/image_${Date.now()}.png`;
    const { data, error } = await supabase.storage
      .from("screenshots")
      .upload(fileName, binaryData, {
        contentType: "image/png",
        upsert: true,
      });

    if (error) {
      throw new Error(
        `Failed to upload image: ${error.message} ${JSON.stringify(error)}`
      );
    }

    // Return the public URL of the uploaded image
    const { data: publicUrlData } = supabase.storage
      .from("screenshots")
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error("Error uploading image:", err);
    throw err;
  }
};
