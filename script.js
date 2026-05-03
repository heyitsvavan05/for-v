// --- 1. THE UNIVERSAL AUTOPLAY LOGIC ---
function startAutoplay() {
  const bgm = document.getElementById('bgm');
  if (bgm && bgm.paused) {
    bgm.play().then(() => {
      const btn = document.querySelector('.music-btn');
      if (btn) btn.style.opacity = '1';
    }).catch(error => {
      console.log("Waiting for user interaction...");
    });
  }
}

// Global listeners for first tap/scroll (Required for Mobile)
document.addEventListener('click', startAutoplay, { once: true });
document.addEventListener('touchstart', startAutoplay, { once: true });

// --- 2. THE MUSIC BUTTON TOGGLE ---
function toggleMusic() {
  const bgm = document.getElementById('bgm');
  const btn = document.querySelector('.music-btn');
  if (!bgm) return;

  if (bgm.paused) {
    bgm.play();
    if (btn) btn.style.opacity = '1';
  } else {
    bgm.pause();
    if (btn) btn.style.opacity = '0.5';
  }
}

// --- 3. SHOW HIDDEN CONTENT ---
function show(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.toggle('hidden');
    startAutoplay();
  }
}

// --- 4. AUDIO DUCKING & VIDEO HANDLING ---
document.addEventListener('play', function(e) {
  const bgm = document.getElementById('bgm');
  const video = document.getElementById('birthdayVideo');

  if (bgm && e.target !== bgm) {
    // If a voice note or video plays, handle bgm
    if (e.target === video) {
        bgm.pause();
    } else {
        bgm.volume = 0.2; // Duck volume for voice notes
    }
  }
}, true);

document.addEventListener('pause', function(e) {
  const bgm = document.getElementById('bgm');
  if (bgm && e.target !== bgm) {
    bgm.play().catch(() => {});
    bgm.volume = 1.0; 
  }
}, true);