// background.js

let color = '#3aa757';
let color2 = '#e8453c';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  chrome.storage.sync.set({ color2 });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});
