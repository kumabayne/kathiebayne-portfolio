const gallery = document.querySelector('.gallery');
const modalOverlay = document.querySelector('.modal-overlay');
const modal = document.querySelector('.modal');
const modalBody = document.querySelector('.modal-body');
const modalTitle = document.querySelector('.modal-title');
const closeBtn = document.querySelector('.close-btn i');

closeBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

gallery.addEventListener('click', (e) => {
  if (e.target.className !== 'gallery-item-link') return;

  const targetCategory = e.target.dataset.category.toLowerCase().replaceAll(' ', '-');
  const scrollTop = window.scrollY;

  window.history.pushState('', '', e.target.href);
  
  e.stopPropagation();
  e.preventDefault();
  
  try {
    fetch("/data/gallery.json")
      .then((response) => response.json())
      .then((data) => {
        data.gallery.map((galleryObj) => {
          if (galleryObj[targetCategory]) {
            modalTitle.innerText = galleryObj.title;
            galleryObj[targetCategory].map((image) => {
              const img = document.createElement("img");
              const categoryDir = targetCategory
                .toLowerCase()
                .replaceAll(" ", "-");
              img.src = `/images/${categoryDir}/${image}`;
              img.className = "gallery-img img-fluid";
              modalBody.appendChild(img);
            });
          }
        });

        modalOverlay.style.display = "block";
        modal.style.display = "block";
        modal.style.opacity = 1;
        modal.style.top = `${scrollTop}px`;
        modal.style.transition = "opacity .3s ease-in-out";
      });  
  } catch (error) {
    return false;
  }
    
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollTop}px`;

  return false;
});

function closeModal(e) {
  e.preventDefault();
  
  if (e.target !== this) return;
  
  window.history.pushState('', '', '/');
  
  const scrollY = document.body.style.top;

  modalTitle.innerText = 'Gallery Page';
  const images = Array.from(modal.querySelectorAll('img'));
  images.forEach(image => modalBody.removeChild(image));

  document.body.style.position = '';
  document.body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1);

  modalOverlay.style.display = 'none';
  modal.style.display = 'none';
  modal.style.opacity = 0;
  modal.style.transition = 'opacity 0s';
}