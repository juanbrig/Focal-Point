const images = [
  './img/foto1.jpg',
  './img/foto2.jpeg',
  './img/foto3.jpeg',
  './img/foto4.jpeg',
  './img/foto5.jpeg',
  './img/foto6.jpeg',
  './img/foto8.jpeg',
  './img/foto9.jpeg',
];

function preloadImages() {
  images.forEach(src => {
    const img = new Image();
    img.src = src;
    console.log(`Preloading image: ${src}`);
  });
}

function getRandomImage() {
  return images[Math.floor(Math.random() * images.length)];
}

function changeBackground() {
  const newImage = getRandomImage();
  document.body.style.setProperty('--background-image', `url(${newImage})`);
  console.log(`Changing background to: ${newImage}`);
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

  const initialImage = getRandomImage();
  document.body.style.setProperty('--background-image', `url(${initialImage})`);
  console.log(`Initial background image: ${initialImage}`);
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
