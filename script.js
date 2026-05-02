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
  }
}

// Auto-play background music on page load
window.addEventListener('load', function() {
  const audio = document.getElementById('bgm');
  if (audio) {
    audio.play().catch(function(error) {
      console.log('Autoplay prevented:', error);
    });
  }
});
