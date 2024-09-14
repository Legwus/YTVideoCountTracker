// Select the canonical link element
const canonicalLink = document.querySelector('link[rel="canonical"]');

if (canonicalLink) {
  // Create a MutationObserver to detect changes in the attributes of the link
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'href') {
        console.log('Canonical link href changed to:', canonicalLink.getAttribute('href'));
      }
    }
  });

  // Configure the observer to watch for attribute changes
  observer.observe(canonicalLink, { attributes: true });

  // To stop observing, you can later call observer.disconnect();
} else {
  console.log('No canonical link found');
}


function trackVideo() {
    const videoId = getVideoId(window.location.href); // Ensure this function is correctly implemented
    const videoUrl = previousUrl;
    // Extract the video title from the document
    //const titleElement = document.querySelector('yt-formatted-string.style-scope.ytd-watch-metadata');
    //const videoTitle = titleElement ? titleElement.textContent.trim() : null;
    const videoTitleForRegex = document.title.split(" - YouTube")[0].trim();
    const videoTitle = videoTitleForRegex.replace(/\(\d+\)\s*/, '');
    if (!videoTitle) {
        console.error('Video title not found.');
        return;
    }

    console.log(videoTitle);  // Outputs the video title

    chrome.storage.local.get([videoTitle], function (result) {
        // Initialize count and URL if not already set
        let videoData = result[videoTitle] || { count: 0, url: videoUrl };

        // Check if URL has changed
        if (videoData.url !== videoUrl) {
            videoData.url = videoUrl; // Update URL if changed
        }

        // Increment count
        videoData.count++;

        // Update local storage with the new count and URL
        chrome.storage.local.set({
            [videoTitle]: videoData
        }, function () {
            console.log(`Video: ${videoTitle} has been watched ${videoData.count} times.`);
        });
    });

}


// Example getVideoId function (you should implement this according to your needs)
function getVideoId(url) {
    // Extract the video ID from the URL
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('v');
}

// Initialize tracking with MutationObserver
//initTracking();

function onUrlChange(newUrl) {
    console.log('URL changed to:', newUrl);
    trackVideo();
}

// Store the initial URL

let previousUrl = window.location.href;



// Set up a function to periodically check for URL changes
function checkForUrlChange() {
    // Get the current URL
    let currentUrl = window.location.href;
    // Check if the URL has changed
    if (currentUrl !== previousUrl) {
        // Call the function if the URL has changed
        onUrlChange(currentUrl);

        // Update the stored URL
        previousUrl = currentUrl;
    }

    // Schedule the next check
    setTimeout(checkForUrlChange, 1000); // Check every 1 second (adjust as needed)
}
// Start checking for URL changes
//checkForUrlChange();

window.onload = trackVideo;

//window.trackVideo = trackVideo;
window.checkForUrlChange = checkForUrlChange;