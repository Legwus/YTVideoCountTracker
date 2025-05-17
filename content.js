
let lastUrl = location.href;
const url = location.href;
// const url = window.location.href;
// const title = videoTitle.getAttribute("title");

function trackVideo(url){
    const videoTitle = document.querySelector('ytd-watch-metadata yt-formatted-string[title]');
    if (videoTitle) {
        const title = videoTitle.getAttribute("title");
        console.log("tytuł:" + title);
        saveVideoTitleAndCount(title,url);
    } else {
        console.log("cos sie wyjebalo");
    }
   
}
setInterval(() => {
    if ( location.href !== lastUrl ) {
        lastUrl = location.href;
        console.log("link sie zmienil na:", lastUrl);
        trackVideo(location.href);

    }


    
}, 1000)

function saveVideoTitleAndCount(title, url) {
   
    browser.storage.local.get([title], (result) => {

        let data = result[title] || { count: 0, url: url };

        data.count += 1;
        
        browser.storage.local.set({ [title]: data }, () => {
            console.log(`Saved: ${title}, watched ${data.count} times.`);
        });
    });
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