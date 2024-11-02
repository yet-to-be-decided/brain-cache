document.getElementById("confirmBtn").addEventListener("click", async () => {
  console.log();
  const userInput = document.getElementById("userInput").value;

  if (!userInput) {
    alert("Please enter some input.");
    return;
  }

  // Check if token already exists in storage
  chrome.storage.local.get("authToken", async (data) => {
    let token = data.authToken;

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
        sendPageData(userInput, token);
      });
    } else {
      // Token exists, use it directly
      sendPageData(userInput, token);
    }
  });
});

async function sendPageData(userInput, token) {
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

          await fetch("http://localhost:3000/api/data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              input: userInput,
              url: pageUrl,
              pageContent: pageBody,
              email: userInfo.email,
            }),
          });
          alert("Data sent successfully!");
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

document.getElementById("loginBtn").addEventListener("click", () => {
  chrome.identity.getAuthToken({ interactive: true }, (token) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      alert("Authentication failed");
      return;
    }
    chrome.storage.local.set({ authToken: token });
    alert("Logged in successfully!");
  });
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  chrome.storage.local.remove("authToken", () => {
    alert("Logged out successfully!");
  });
});

chrome.storage.local.get("authToken", (data) => {
  if (!data.authToken) {
    document.getElementById("logoutBtn").style.display = "none";
    document.getElementById("loginBtn").style.display = "block";
  }
});
