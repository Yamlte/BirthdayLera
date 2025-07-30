const countdownEl = document.getElementById('countdown');
function updateCountdown() {
  const now = new Date();
  let next = new Date(now.getFullYear(), 6, 3); // 3 июля (месяц — с нуля)
  if (now > next) next.setFullYear(now.getFullYear() + 1);
  const diff = next - now;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  countdownEl.textContent = `${d} дн ${h}ч ${m}м ${s}с`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Увеличение фото с модальным фоном
const overlay = document.createElement('div');
overlay.id = 'overlay';
overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;display:none;justify-content:center;align-items:center;background:rgba(0,0,0,0.8);z-index:9999;';
const overlayImg = document.createElement('img');
overlayImg.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:10px;';
overlay.appendChild(overlayImg);
document.body.appendChild(overlay);

// Бесконечная автопрокрутка
const galleryWrapper = document.getElementById('photoGallery');
const track = galleryWrapper.querySelector('.gallery');
track.innerHTML += track.innerHTML; // дублируем изображения

let speed = 0.5;
let pos = 0;
let isPaused = false;

function autoScroll() {
  if (!isPaused) {
    pos += speed;
    if (pos >= track.scrollWidth / 2) pos = 0;
    galleryWrapper.scrollLeft = pos;
  }
  requestAnimationFrame(autoScroll);
}
autoScroll();

// Открытие фото — пауза, закрытие — продолжение
track.querySelectorAll('img').forEach(img => {
  img.addEventListener('click', () => {
    overlayImg.src = img.src;
    overlay.style.display = 'flex';
    isPaused = true;
  });
});

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    overlay.style.display = 'none';
    isPaused = false;
  }
});

// Дополнительно: при взаимодействии вручную — ставим/снимаем паузу
galleryWrapper.addEventListener('mouseenter', () => isPaused = true);
galleryWrapper.addEventListener('mouseleave', () => isPaused = false);
galleryWrapper.addEventListener('touchstart', () => isPaused = true);
galleryWrapper.addEventListener('touchend', () => isPaused = false);
