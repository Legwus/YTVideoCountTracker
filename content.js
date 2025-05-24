
let lastUrl = location.href;
const url = location.href;


setInterval(() => {
 
    if ( location.href !== lastUrl) {
        
        lastUrl = location.href;
        
    }


    
}, 1000)

function observeTitle(retryCount = 0) {
  const target = document.querySelector('ytd-watch-metadata h1 > yt-formatted-string');
    console.log("attempting to start mutation observer");
  if (target) {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
          console.log('Title changed:', target.textContent.trim());
          saveVideoTitleAndCount(target.textContent.trim(), lastUrl);
        }
      }
    });

    observer.observe(target, {
      childList: true,
      characterData: true,
      subtree: true
    });

    console.log('Observer is now watching the title element.');
  } else {
    if (retryCount < 20) { // limit retries to avoid infinite loop
      setTimeout(() => observeTitle(retryCount + 1), 500); // retry after 500ms
    } else {
      console.warn('Failed to find the title element after multiple attempts.');
    }
  }
}

observeTitle();

function saveVideoTitleAndCount(title, url) {
   setTimeout(() => {
        chrome.storage.local.get([title], (result) => {

                let data = result[title] || { count: 0, url: url };

                data.count += 1;
                
                chrome.storage.local.set({ [title]: data }, () => {
                    console.log(`Saved: ${title}, watched ${data.count} times.`);
                });
            });
   }, 2000)
   
}


















































// function trackVideo(url) {
//     const videoUrl = url;
//     let videoTitle = window.navigator.mediaSession.metadata.title;
//     if (!videoTitle) {
//         console.error('Video title not found.');
//         return;
//     }

//     console.log(videoTitle);  // Outputs the video title

//     browser.storage.local.get([videoTitle], function (result) {
//         let videoData = result[videoTitle] || { count: 0, url: videoUrl };

//         if (videoData.url !== videoUrl) {
//             videoData.url = videoUrl; // Update URL if changed
//         }

//         videoData.count++;

//         browser.storage.local.set({
//             [videoTitle]: videoData
//         }, function () {
//             console.log(`Video: ${videoTitle} has been watched ${videoData.count} times.`);
//         });
//     });

// }

// //chrome.storage.local.videos.VIDE_OTITLE

// let previousVideoTitle = "";
// setInterval(() => {
//     let currentVideoTitle = window.navigator.mediaSession.metadata.title;
//     console.log("Kontrolny log", previousVideoTitle, currentVideoTitle);
//     if (currentVideoTitle == previousVideoTitle) {
//         return
//     }
//     trackVideo(window.location.href);
//     previousVideoTitle = currentVideoTitle;
// }, 1000)