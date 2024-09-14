chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.includes('youtube.com/watch')) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: () => {
          if (window.checkForUrlChange()) {
            window.checkForUrlChange();
          } else {
            console.error('checkForUrlChange function not found.');
          }
        }
      }).catch(err => console.error('Error executing script: ', err));
    }
  });