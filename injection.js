// injection.js

// Call the function defined in content.js
if (window.trackVideo) {
    window.trackVideo();
  } else {
    console.error('trackVideo function not found.');
  }
  