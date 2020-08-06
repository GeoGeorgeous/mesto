let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
function showPopUp() {
  let popUp = document.querySelector('.popup');
  popUp.classList.add('popup_opened');
}
function hidePopUp() {
  let popUp = document.querySelector('.popup');
  popUp.classList.remove('popup_opened');
}
editButton.addEventListener('click', showPopUp);
closeButton.addEventListener('click', hidePopUp);
