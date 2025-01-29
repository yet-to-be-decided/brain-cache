// fetch snap form other wrapper api and return the snap

module.exports = async (bodyContent: string) => {
  const response = await fetch("http://127.0.0.1:8000/summarize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: bodyContent,
    }),
  });
  const data = await response.json();
  return data;
};
