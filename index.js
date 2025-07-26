 const countdownEl = document.getElementById('countdown');
    function updateCountdown() {
      const now = new Date();
      let next = new Date(now.getFullYear(), 6, 3); // 3 июля => месяц 6
      if (now > next) next.setFullYear(now.getFullYear()+1);
      const diff = next - now;
      const d = Math.floor(diff/86400000);
      const h = Math.floor((diff%86400000)/3600000);
      const m = Math.floor((diff%3600000)/60000);
      const s = Math.floor((diff%60000)/1000);
      countdownEl.textContent = `${d} дн ${h}ч ${m}м ${s}с`;
    }
    setInterval(updateCountdown,1000);
    updateCountdown();

    // Увеличение фото
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;display:none;justify-content:center;align-items:center;background:rgba(0,0,0,0.8);z-index:9999;';
    const overlayImg = document.createElement('img');
    overlayImg.style.maxWidth='90vw'; overlayImg.style.maxHeight='90vh'; overlayImg.style.borderRadius='10px';
    overlay.appendChild(overlayImg);
    document.body.appendChild(overlay);
    document.querySelectorAll('.gallery img').forEach(img=>{
      img.addEventListener('click',()=>{
        overlayImg.src = img.src;
        overlay.style.display = 'flex';
      });
    });
    overlay.addEventListener('click',()=> overlay.style.display='none');

    // Бесконечная автопрокрутка
    const galleryWrapper = document.getElementById('photoGallery');
    let speed = 0.5, interacting = false;
    galleryWrapper.addEventListener('mouseenter',()=>interacting=true);
    galleryWrapper.addEventListener('mouseleave',()=>interacting=false);
    galleryWrapper.addEventListener('touchstart',()=>interacting=true);
    galleryWrapper.addEventListener('touchend',()=>interacting=false);

    // Дублируем контент для плавности
    const track = galleryWrapper.querySelector('.gallery');
    track.innerHTML += track.innerHTML;

    let pos = 0;
    function autoScroll(){
      if(!interacting){
        pos += speed;
        if(pos >= track.scrollWidth/2) pos = 0;
        galleryWrapper.scrollLeft = pos;
      }
      requestAnimationFrame(autoScroll);
    }
    autoScroll();
