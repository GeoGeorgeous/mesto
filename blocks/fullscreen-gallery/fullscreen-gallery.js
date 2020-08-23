const cardImage = document.querySelectorAll('.card__image');
const fullScreenPopUp = document.querySelector('.fullscreen-gallery');
const fullScreenPopUpCloseBtn = document.querySelector('.fullscreen-gallery__close-button');

const fullscreenImage = document.querySelector('.fullscreen-gallery__close-button');
const fullscreenCaption = document.querySelector('.fullscreen-gallery__close-button');

function toggleFullScreen() {
  fullScreenPopUp.classList.toggle('fullscreen-gallery_opened');
}

cardImage.forEach(function (el) {
  el.addEventListener('click',function (event) {
    let caption = event.target.parentElement.querySelector('.card__title').textContent // find the right caprion
    let imgSrc = event.target.src // find the right image src
    fullScreenPopUp.querySelector('.fullscreen-gallery__caption').textContent = caption;
    fullScreenPopUp.querySelector('.fullscreen-gallery__image').src = imgSrc;
    fullScreenPopUp.querySelector('.fullscreen-gallery__image').alt = caption;
    toggleFullScreen()
  });
});

fullScreenPopUpCloseBtn.addEventListener('click',toggleFullScreen);

