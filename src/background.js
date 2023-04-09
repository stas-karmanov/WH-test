chrome.runtime.onInstalled.addListener(() => {
  // https://github.com/GoogleChrome/developer.chrome.com/issues/2602
  chrome.action.openPopup();
});
