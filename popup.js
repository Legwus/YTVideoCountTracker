// Get stored video data and display it in the popup

chrome.storage.local.get(null, function(result) {
    const videoList = document.getElementById('videoList');
    for (let videoTitle in result) {
      const li = document.createElement('li');
     
     
      const link = document.createElement('a');
      const videoData = result[videoTitle];
      const videoUrl = videoData.url || '#';
      link.href = videoUrl;
      link.textContent = `Video ID: ${videoTitle} - Watched ${videoData.count || 0} times`;
      link.target = "_blank";  // Open the link in a new tab
      
      li.appendChild(link);
      videoList.appendChild(li);
    }
  });