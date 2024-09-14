function trackVideo(url) {
    const videoUrl = url;
    let videoTitle = window.navigator.mediaSession.metadata.title;
    if (!videoTitle) {
        console.error('Video title not found.');
        return;
    }

    console.log(videoTitle);  // Outputs the video title

    chrome.storage.local.get([videoTitle], function (result) {
        let videoData = result[videoTitle] || { count: 0, url: videoUrl };

        if (videoData.url !== videoUrl) {
            videoData.url = videoUrl; // Update URL if changed
        }

        videoData.count++;

        chrome.storage.local.set({
            [videoTitle]: videoData
        }, function () {
            console.log(`Video: ${videoTitle} has been watched ${videoData.count} times.`);
        });
    });

}

//chrome.storage.local.videos.VIDE_OTITLE

let previousVideoTitle = "";
setInterval(() => {
    let currentVideoTitle = window.navigator.mediaSession.metadata.title;
    console.log("Kontorlny log", previousVideoTitle, currentVideoTitle);
    if (currentVideoTitle == previousVideoTitle) {
        return
    }
    trackVideo(window.location.href);
    previousVideoTitle = currentVideoTitle;
}, 1000)