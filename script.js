// --- 1. THE UNIVERSAL AUTOPLAY LOGIC ---
function startAutoplay() {
  const audio = document.getElementById('bgm');
  if (audio && audio.paused) {
    audio.play().then(() => {
      // Sync the music button visual if it exists
      const btn = document.querySelector('.music-btn');
      if (btn) btn.style.opacity = '1';
    }).catch(error => {
      console.log("Autoplay waiting for tap.");
    });
  }
}

// Global listeners for the first tap/click (Essential for Mobile)
document.addEventListener('click', startAutoplay, { once: true });
document.addEventListener('touchstart', startAutoplay, { once: true });

// --- 2. THE MUSIC BUTTON TOGGLE ---
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

// --- 3. SHOW HIDDEN CONTENT (Specifically for the overthinking page) ---
function show(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.toggle('hidden');
    // Start music here if it hasn't already started
    startAutoplay();
  }
}

// --- 4. THE VOICE DUCKING (Make music quiet when voice plays) ---
document.addEventListener('play', function(e) {
  const bgm = document.getElementById('bgm');
  // If the playing element is NOT the background music, it's a voice note
  if (bgm && e.target !== bgm) {
    bgm.volume = 0.2; // Dips background music to 20% volume
  }
}, true);

document.addEventListener('pause', function(e) {
  const bgm = document.getElementById('bgm');
  if (bgm && e.target !== bgm) {
    bgm.volume = 1.0; // Restores background music to 100% volume
  }
}, true);
