// fetch snap form other wrapper api and return the snap

interface note {
  content: string;
  related_images?: string[];
  related_links?: string[];
  related_codes?: string[];
}

interface SnapData {
  summary: string;
  title: string;
  tags: string[];
  notes: note[];
}

module.exports = async (bodyContent: string) => {
  // const response = await fetch('https://api.snapchat.wtf/snap', {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //         content: bodyContent,
  //     }),
  // });
  // const data = await response.json();
  const data: SnapData = {
    summary: "This is a summary",
    title: "This is a title",
    tags: ["tag1", "tag2"],
    notes: [
      {
        content: "This is a note",
      },
    ],
  };
  return data;
};
