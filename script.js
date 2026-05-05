// --- 1. UNIVERSAL AUDIO HANDLER ---
// This function detects which audio is present and handles the autoplay/fallback
function startAutoplay() {
  const yellowBgm = document.getElementById('yellowBgm');
  const standardBgm = document.getElementById('bgm');
  
  // Priority: If yellowBgm is on the page, use it. Otherwise, use standard bgm.
  const activeAudio = yellowBgm || standardBgm;

  if (activeAudio && activeAudio.paused) {
    activeAudio.play().then(() => {
      // Audio started successfully
      const btn = document.querySelector('.music-btn');
      if (btn) btn.style.opacity = '1';
    }).catch(error => {
      console.log("Autoplay blocked. Waiting for user interaction...");
      
      // MOBILE FALLBACK: Play as soon as the user taps anywhere on the screen
      const playOnInteraction = () => {
        activeAudio.play();
        const btn = document.querySelector('.music-btn');
        if (btn) btn.style.opacity = '1';
        document.removeEventListener('click', playOnInteraction);
        document.removeEventListener('touchstart', playOnInteraction);
      };

      document.addEventListener('click', playOnInteraction);
      document.addEventListener('touchstart', playOnInteraction);
    });
  }
}

// Global listeners for first interaction (Required for main page entry)
document.addEventListener('click', startAutoplay, { once: true });
document.addEventListener('touchstart', startAutoplay, { once: true });

// --- 2. MUSIC TOGGLE CONTROL ---
function toggleMusic() {
  const bgm = document.getElementById('yellowBgm') || document.getElementById('bgm');
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

// --- 3. SHOW HIDDEN CONTENT (For overthinking/miss you pages) ---
function show(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.toggle('hidden');
    startAutoplay();
  }
}

// --- 4. NAVIGATION LOGIC (The "Prime" for Yellow Page) ---
function enterYellow() {
    // Wakes up the browser's audio engine before changing pages
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
        const context = new AudioContext();
        context.resume().then(() => {
            window.location.href = 'yellow.html';
        });
    } else {
        window.location.href = 'yellow.html';
    }
}

// --- 5. AUDIO DUCKING & VIDEO HANDLING ---
document.addEventListener('play', function(e) {
  const activeBgm = document.getElementById('yellowBgm') || document.getElementById('bgm');
  const video = document.getElementById('birthdayVideo');

  if (activeBgm && e.target !== activeBgm) {
    if (e.target === video) {
        activeBgm.pause();
    } else {
        activeBgm.volume = 0.2; // Lower volume for voice notes/other media
    }
  }
}, true);

document.addEventListener('pause', function(e) {
  const activeBgm = document.getElementById('yellowBgm') || document.getElementById('bgm');
  if (activeBgm && e.target !== activeBgm) {
    activeBgm.play().catch(() => {});
    activeBgm.volume = 1.0; 
  }
}, true);
