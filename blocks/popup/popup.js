// Popup window
let popUp = document.querySelector('.popup');
// Edit button
let editButton = document.querySelector('.profile__edit-button');
// Close button
let closeButton = document.querySelector('.popup__close-button');
// Save button
let saveButton = document.querySelector('.popup__container');
// Account name
let accountName = document.querySelector('.profile__name');
// Account Description
let accountDescription = document.querySelector('.profile__description');
// Input field for name
let inputAccountName = document.querySelector('.popup__form-item_input_name');
// Input field for desc
let inputAccountDescription = document.querySelector('.popup__form-item_input_description');

function showPopUp() {
  // get current account name and description and put in.
  inputAccountName.value = accountName.textContent;
  inputAccountDescription.value = accountDescription.textContent;
  // show popup
  popUp.classList.add('popup_opened');
}

function hidePopUp() {
  popUp.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  accountName.textContent = inputAccountName.value;
  accountDescription.textContent = inputAccountDescription.value;
  hidePopUp();
}

editButton.addEventListener('click', showPopUp);
closeButton.addEventListener('click', hidePopUp);
saveButton.addEventListener('submit', formSubmitHandler);
