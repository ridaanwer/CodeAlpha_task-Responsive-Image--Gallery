document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.querySelector('.close-btn');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  let visibleItems = [];
  let currentIndex = 0;
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === category) {
          item.classList.remove('hide');
        } else {
          item.classList.add('hide');
        }
      });

      updateVisibleItems();
    });
  });

  function updateVisibleItems() {
    visibleItems = Array.from(galleryItems).filter(item => !item.classList.contains('hide'));
  }

  updateVisibleItems();
  
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      updateVisibleItems();
      currentIndex = visibleItems.indexOf(item);
      openLightbox();
    });
  });

  function openLightbox() {
    if (currentIndex < 0 || currentIndex >= visibleItems.length) return;
    const currentItem = visibleItems[currentIndex];
    const imgElement = currentItem.querySelector('img');
    const captionText = currentItem.querySelector('.overlay span').innerText;

    lightboxImg.src = imgElement.src;
    lightboxCaption.innerText = captionText;
    lightbox.classList.add('active');
  }
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  function closeLightbox() { 
    lightbox.classList.remove('active');
  }
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  function showPrev() {
    if (visibleItems.length === 0) return;
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    openLightbox();
  }

  function showNext() {
    if (visibleItems.length === 0) return;
    currentIndex = (currentIndex + 1) % visibleItems.length;
    openLightbox();
  }
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    } else if (e.key === 'ArrowRight') { 
      showNext();
    }
  });
});