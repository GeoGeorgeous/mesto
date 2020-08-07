let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let saveButton = document.querySelector('.popup__container');
let accountName = document.querySelector('#name');
let accountDescription = document.querySelector('#description');

function showPopUp() {
  let popUp = document.querySelector('.popup');
  popUp.classList.add('popup_opened');
}

function hidePopUp() {
  let popUp = document.querySelector('.popup');
  popUp.classList.remove('popup_opened');
}

function getDefaultInput() {
  let inputName = document.querySelector('#input_name');
  let inputDescription = document.querySelector('#input_description');
  inputName.value = accountName.textContent;
  inputDescription.value = accountDescription.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  let inputName = document.querySelector('#input_name');
  let inputDescription = document.querySelector('#input_description');
  accountName.textContent = inputName.value;
  accountDescription.textContent = inputDescription.value;
  hidePopUp();
}
getDefaultInput();
editButton.addEventListener('click', showPopUp);
closeButton.addEventListener('click', hidePopUp);
saveButton.addEventListener('submit', formSubmitHandler);
