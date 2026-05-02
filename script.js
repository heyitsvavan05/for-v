// Function to start audio as soon as she interacts with the page
function startAutoplay() {
  const audio = document.getElementById('bgm');
  if (audio && audio.paused) {
    audio.play().then(() => {
      // If there's a button, make sure it looks "active"
      const btn = document.querySelector('.music-btn');
      if (btn) btn.style.opacity = '1';
    }).catch(error => {
      console.log("Autoplay waiting for tap.");
    });
  }
}

// Global listeners for the first tap/click
document.addEventListener('click', startAutoplay, { once: true });
document.addEventListener('touchstart', startAutoplay, { once: true });

// Manual Toggle for the music button
function toggleMusic() {
  const audio = document.getElementById('bgm');
  const btn = document.querySelector('.music-btn');
  if (!audio) return;

  if (audio.paused) {
    audio.play();
    if (btn) btn.style.opacity = '1';
  } else {
    audio.pause();
    if (btn) btn.style.opacity = '0.5';
  }
}

// Show/hide content (specifically for the overthinking page)
function show(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.toggle('hidden');
    
    // Also try to start music here just in case
    startAutoplay();
  }
}
