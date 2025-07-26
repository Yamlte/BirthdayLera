 const birthday = new Date("2026-07-03T00:00:00");
    const countdown = document.getElementById("countdown");

    function updateCountdown() {
      const now = new Date();
      let nextBDay = new Date(birthday);
      if (now > nextBDay) {
        nextBDay.setFullYear(now.getFullYear() + 1);
      }
      const diff = nextBDay - now;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      countdown.innerHTML = `⏳ До следующего ДР осталось: ${days}д ${hours}ч ${minutes}м ${seconds}с`;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
    const galleryWrapper = document.querySelector('.gallery-wrapper');
  const gallery = document.querySelector('.gallery');
  const images = document.querySelectorAll('.gallery img');

  // Клонируем изображения для бесконечной прокрутки
  images.forEach(img => {
    const clone = img.cloneNode(true);
    gallery.appendChild(clone);
  });

  // Автопрокрутка
  let scrollSpeed = 0.5; // скорость прокрутки
  function autoScroll() {
    galleryWrapper.scrollLeft += scrollSpeed;
    if (galleryWrapper.scrollLeft >= gallery.scrollWidth / 2) {
      galleryWrapper.scrollLeft = 0;
    }
    requestAnimationFrame(autoScroll);
  }

  autoScroll();
 