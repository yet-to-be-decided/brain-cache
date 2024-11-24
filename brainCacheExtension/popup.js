document.getElementById("confirmBtn").addEventListener("click", async () => {
  // Check if token already exists in storage
  chrome.storage.local.get("authToken", async (data) => {
    let token = data.authToken;
    console.log(token);

    if (!token) {
      // No token, proceed with login and token retrieval
      chrome.identity.getAuthToken({ interactive: true }, (newToken) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          alert("Authentication failed");
          return;
        }
        token = newToken;
        // Save token to storage for future use
        chrome.storage.local.set({ authToken: token });
        sendPageData(token);
      });
    } else {
      // Token exists, use it directly
      sendPageData(token);
    }
  });
});

document.getElementById("cancelBtn").addEventListener("click", () => {
  window.close();
});

async function sendPageData(token) {
  const userInfo = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  ).then((response) => response.json());

  const userEmail = userInfo.email;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        function: getPageContent,
      },
      async (results) => {
        console.log(results);
        if (results && results[0]) {
          const { pageUrl, pageBody } = results[0].result;

          chrome.tabs.captureVisibleTab(
            null,
            { format: "png" },
            async (image) => {
              if (!image) {
                console.error("Failed to capture screenshot");
                alert("Screenshot capture failed");
                return;
              }

              try {
                const response = await fetch(
                  "http://localhost:8080/api/extension/storedata",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      url: pageUrl,
                      pageContent: pageBody,
                      email: userInfo.email,
                      username: userInfo.name,
                      screenshot: image, // Base64 encoded screenshot
                    }),
                  }
                );

                if (response.status === 201) {
                  alert("Data sent successfully!");
                  window.close();
                } else {
                  console.error(
                    "Failed to send data. Status code:",
                    response.status
                  );
                  alert("Failed to send data. Please try again.");
                }
              } catch (error) {
                console.error("Error sending data:", error);
                alert("An error occurred while sending data.");
              }
            }
          );
        } else {
          console.error("Failed to retrieve page content");
        }
      }
    );
  });
}

function getPageContent() {
  return {
    pageUrl: window.location.href,
    pageBody: document.body.outerHTML,
  };
}
