const lightbox = document.querySelector('.lightbox');
const lightboxCloseBtn = document.querySelector('.lightbox__close-button');

function addLightbox(card) {
  const cardImage = card.querySelector('.card__image');
  cardImage.addEventListener('click',function (event) {
    let caption = event.target.parentElement.querySelector('.card__title').textContent // find the right caprion
    let imgSrc = event.target.src // find the right image source
    lightbox.querySelector('.lightbox__caption').textContent = caption;
    lightbox.querySelector('.lightbox__image').src = imgSrc;
    lightbox.querySelector('.lightbox__image').alt = caption;
    toggleFullScreen()
  })}


function toggleFullScreen() {
  lightbox.classList.toggle('lightbox_opened');
}

lightboxCloseBtn.addEventListener('click',toggleFullScreen);
