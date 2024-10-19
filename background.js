chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'open_popup') {
    chrome.action.openPopup();  // Opens the popup
  }
});
