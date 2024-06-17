const images = [
  './img/foto1.jpg',
  // './img/foto2.jpg',
  // './img/foto3.jpg',
  // './img/foto4.jpg',
  // './img/foto5.jpg',
  // './img/foto6.jpg',
  // './img/foto7.jpeg',
  // './img/foto8.jpeg',
  './img/foto9.jpeg',
  './img/foto10.jpeg',
  './img/foto11.jpeg',
  // './img/foto12.jpeg',
  './img/foto13.jpeg',
  './img/foto14.jpeg',
  './img/foto15.jpeg',
];

let currentIndex = 0;

function preloadImages() {
  images.forEach(src => {
    const img = new Image();
    img.src = src;
    console.log(`Preloading image: ${src}`);
  });
}

function changeBackground() {
  currentIndex = (currentIndex + 1) % images.length;
  document.body.style.setProperty('--background-image', `url(${images[currentIndex]})`);
  console.log(`Changing background to: ${images[currentIndex]}`);
}

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');
  const closeBtn = document.getElementById('close-btn');

  hamburger.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  closeBtn.addEventListener('click', () => {
    menu.classList.remove('open');
  });

  document.body.style.setProperty('--background-image', `url(${images[0]})`);
  console.log(`Initial background image: ${images[0]}`);
  preloadImages();
  setInterval(changeBackground, 4000);

  let touchstartX = 0;
  let touchendX = 0;

  function handleGesture() {
    if (touchendX < touchstartX && menu.classList.contains('open')) {
      menu.classList.remove('open');
    }
  }

  menu.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
  });

  menu.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    handleGesture();
  });
});