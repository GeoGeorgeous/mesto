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
let input_accountName = document.querySelector('.popup__form-item_input_name');
// Input field for desc
let input_accountDescription = document.querySelector('.popup__form-item_input_description');

function showPopUp() {
  // get current account name and description and put in.
  input_accountName.value = accountName.textContent;
  input_accountDescription.value = accountDescription.textContent;
  // show popup
  popUp.classList.add('popup_opened');
}

function hidePopUp() {
  popUp.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  accountName.textContent = input_accountName.value;
  accountDescription.textContent = input_accountDescription.value;
}

editButton.addEventListener('click', showPopUp);
closeButton.addEventListener('click', hidePopUp);
saveButton.addEventListener('submit', formSubmitHandler);
