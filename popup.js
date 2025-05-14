document.addEventListener('DOMContentLoaded', () => {
  const videoList = document.getElementById('videoList');

  browser.storage.local.get(null).then((result) => {
    for (let videoTitle in result) {
      const li = document.createElement('li');

      const link = document.createElement('a');
      const videoData = result[videoTitle];
      const videoUrl = videoData.url || '#';
      link.href = videoUrl;
      link.textContent = `Video: ${videoTitle} - Watched ${videoData.count || 0} times`;
      link.target = "_blank";

      li.appendChild(link);
      videoList.appendChild(li);
    }
  }).catch((error) => {
    console.error('Failed to load data from storage:', error);
  });
});


