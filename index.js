const images = [
  './img/foto1.jpg',
  './img/foto2.jpg',
];

let currentIndex = 0;
let lastScrollTop = 0;

function preloadImages() {
  images.forEach(src => {
    const img = new Image();
    img.src = src;
    console.log(`Preloading image: ${src}`);
  });
}

function changeBackground() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;

  if (Math.abs(scrollTop - lastScrollTop) > windowHeight / 2) {
    if (scrollTop > lastScrollTop) {
      currentIndex = (currentIndex + 1) % images.length;
    } else {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
    }
    document.body.style.setProperty('--background-image', `url(${images[currentIndex]})`);
    console.log(`Changing background to: ${images[currentIndex]}`);
    lastScrollTop = scrollTop;
  }
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

  // Inicializar con la primera imagen
  document.body.style.setProperty('--background-image', `url(${images[0]})`);
  console.log(`Initial background image: ${images[0]}`);

  // Precargar imágenes
  preloadImages();

  // Escuchar el evento de scroll
  window.addEventListener('scroll', changeBackground);

  // Manejar deslizamiento para cerrar el menú
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
