// Initialize button with user's preferred color
let sweepMines = document.getElementById("solveMine");

chrome.storage.sync.get("color", ({ color }) => {
    sweepMines.style.backgroundColor = color;
});

// When the button is clicked, inject simulateClick into current page
sweepMines.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        //function: simulateClick,
        files: ['script.js'],
    });
});
