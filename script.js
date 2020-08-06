let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let accountName = document.querySelector('#name');
let accountDescription = document.querySelector('#description');


let inputName = document.querySelector('#input_name');
let inputDescription = document.querySelector('#input_description');
console.log(inputName);

// accountName.textContent = "Жак-Ив Кусто";
// accountDescription.textContent = "Исследователь океана";

function showPopUp() {
  let popUp = document.querySelector('.popup');
  popUp.classList.add('popup_opened');
}

function hidePopUp() {
  let popUp = document.querySelector('.popup');
  popUp.classList.remove('popup_opened');
}

function getDefaultInput() {
  inputName.value = accountName.textContent;
  inputDescription.value = accountDescription.textContent;
}

getDefaultInput();
editButton.addEventListener('click', showPopUp);
closeButton.addEventListener('click', hidePopUp);

