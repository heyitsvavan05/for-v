// --- 1. UNIVERSAL AUDIO HANDLER ---
function startAutoplay() {
  const yellowBgm = document.getElementById('yellowBgm');
  const standardBgm = document.getElementById('bgm');
  const activeAudio = yellowBgm || standardBgm;

  if (activeAudio && activeAudio.paused) {
    activeAudio.play().then(() => {
      const btn = document.querySelector('.music-btn');
      if (btn) btn.style.opacity = '1';
    }).catch(error => {
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

// --- 2. MUSIC TOGGLE ---
function toggleMusic() {
  const bgm = document.getElementById('yellowBgm') || document.getElementById('bgm');
  if (!bgm) return;
  if (bgm.paused) { bgm.play(); } else { bgm.pause(); }
}

// --- 3. NAVIGATION LOGIC ---
function enterYellow() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
        const context = new AudioContext();
        context.resume().then(() => { window.location.href = 'yellow.html'; });
    } else {
        window.location.href = 'yellow.html';
    }
}

// --- 4. VIDEO & DUCKING LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const bgm = document.getElementById('bgm');
    const video = document.getElementById('birthdayVideo');

    if (video && bgm) {
        bgm.pause(); // Stay silent while video is there
        video.onended = function() {
            bgm.play();
            bgm.volume = 1.0;
        };
    }
});

document.addEventListener('play', function(e) {
  const activeBgm = document.getElementById('yellowBgm') || document.getElementById('bgm');
  const video = document.getElementById('birthdayVideo');
  if (activeBgm && e.target !== activeBgm && e.target !== video) {
      activeBgm.volume = 0.2; 
  }
}, true);

document.addEventListener('pause', function(e) {
  const activeBgm = document.getElementById('yellowBgm') || document.getElementById('bgm');
  const video = document.getElementById('birthdayVideo');
  if (activeBgm && e.target !== activeBgm && e.target !== video) {
    activeBgm.volume = 1.0; 
  }
}, true);
