const accountPopUp = document.querySelector('.popup[data-type="account"]'); // Edit Account popUp
const accountEditButton = document.querySelector('.profile__edit-button'); // Edit Account button
const accountCloseButton = accountPopUp.querySelector('.popup__close-button'); // Close Account popUp button
const accountSaveButton = accountPopUp.querySelector('.popup__container'); // Save Account popUp button
const accountInputName = accountPopUp.querySelector('.popup__form-item_input_name'); // Input field in Account popUp
const accountInputDesc = accountPopUp.querySelector('.popup__form-item_input_description'); // // Input field in Account popUp

const accountName = document.querySelector('.profile__name'); // Account name
const accountDescription = document.querySelector('.profile__description'); // Account Description

const placePopUp = document.querySelector('.popup[data-type="place"]'); // Add Place popUp
const placeAddButton = document.querySelector('.profile__add-button'); // Add Place button
const placeCloseButton = placePopUp.querySelector('.popup__close-button'); // Close Add Place popUp button
const placeSaveButton = placePopUp.querySelector('.popup__container'); // Save Add Place popUp button
const placeInputTitle = placePopUp.querySelector('.popup__form-item_input_name'); // Input field for title
const placeInputLink = placePopUp.querySelector('.popup__form-item_input_description'); // // Input field for link


function popUpToggle(obj) {
  obj.classList.toggle('popup_opened')
}

function showAccountPopUp() {
  // get current account name and description and put them into input
  accountInputName.value = accountName.textContent;
  accountInputDesc.value = accountDescription.textContent;
  // toggle (show) popup
  popUpToggle(accountPopUp);
}

function closeAccountPopUp() {
  popUpToggle(accountPopUp);
}

function accountFormSubmitHandler (evt) {
  evt.preventDefault();
  accountName.textContent = accountInputName.value;
  accountDescription.textContent = accountInputDesc.value;
  popUpToggle(accountPopUp);
}

accountEditButton.addEventListener('click', showAccountPopUp);
accountCloseButton.addEventListener('click', closeAccountPopUp);
accountSaveButton.addEventListener('submit', accountFormSubmitHandler);


// placePopUp


function showPlacePopUp() {
  popUpToggle(placePopUp);
}

function closePlacePopUp() {
  popUpToggle(placePopUp);
}

function placeFormSubmitHandler (evt) {
  evt.preventDefault();
  popUpToggle(placePopUp);
}

placeAddButton.addEventListener('click', showPlacePopUp);
placeCloseButton.addEventListener('click', closePlacePopUp);
placeSaveButton.addEventListener('submit', placeFormSubmitHandler);

