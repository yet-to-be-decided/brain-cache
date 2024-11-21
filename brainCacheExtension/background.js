chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed and background ready.");
});

chrome.webNavigation.onCompleted.addListener(
  (details) => {
    if (details.frameId === 0) {
      const visitedUrl = details.url;
      console.log(`User visited: ${visitedUrl}`);

      fetch("http://localhost:3000/api/siteVisited", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: visitedUrl }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to send URL to the server.");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Server Response:", data);
        })
        .catch((error) => {
          console.error("Error sending URL:", error);
        });
    }
  },
  { url: [{ urlMatches: "https?://.*" }] }
);
