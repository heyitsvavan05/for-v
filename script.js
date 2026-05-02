// Toggle background music
function toggleMusic() {
  const audio = document.getElementById('bgm');
  const btn = document.querySelector('.music-btn');

  if (audio.paused) {
    audio.play();
    btn.style.opacity = '1';
  } else {
    audio.pause();
    btn.style.opacity = '0.5';
  }
}

// Show/hide hidden content
function show(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.toggle('hidden');
    
    // --- ADDITION: Start music when she clicks the "Still thinking?" button ---
    const audio = document.getElementById('bgm');
    if (audio.paused) {
      audio.play();
    }
  }
}

// FIX: Listen for a click anywhere on the screen to start the music
document.addEventListener('click', function() {
  const audio = document.getElementById('bgm');
  if (audio && audio.paused) {
    audio.play().catch(function(error) {
      console.log('Autoplay still prevented:', error);
    });
  }
}, { once: true }); // This ensures the listener removes itself after the first click
