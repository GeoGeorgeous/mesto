// Popups
const popUp = document.querySelector('.popup.popup_target_edit-account');
// Edit button
const editButton = document.querySelector('.profile__edit-button');
// Close button
const closeButton = popUp.querySelector('.popup__close-button');
// Save button
const saveButton = popUp.querySelector('.popup__container');
// Account name
const accountName = document.querySelector('.profile__name');
// Account Description
const accountDescription = document.querySelector('.profile__description');
// Input field for name
const inputAccountName = popUp.querySelector('.popup__form-item_input_name');
// Input field for desc
const inputAccountDescription = popUp.querySelector('.popup__form-item_input_description');

function popUpToggle() {
  popUp.classList.toggle('popup_opened')
}

function showPopUp() {
  // get current account name and description and put them into input
  inputAccountName.value = accountName.textContent;
  inputAccountDescription.value = accountDescription.textContent;
  // show popup
  popUpToggle();
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  accountName.textContent = inputAccountName.value;
  accountDescription.textContent = inputAccountDescription.value;
  popUpToggle();
}

editButton.addEventListener('click', showPopUp);
closeButton.addEventListener('click', popUpToggle);
saveButton.addEventListener('submit', formSubmitHandler);
