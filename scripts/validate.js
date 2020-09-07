// Конфигурация:
const config = {
  formSelector: '.popup__container',
  fieldsetSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  // inputErrorClass: 'popup__form-item_error',
  errorClass: 'popup__form-item_error'
}

// Функция проверяет валидность инпута и показывает или скрывает ошибку в зависимости от результата:
const checkInputValidity = function(formElement, inputElement, {errorClass, ...rest}) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, errorClass);
  } else {
    hideInputError(formElement, inputElement, errorClass);
  }
}

// Функция показывает ошибку и применяет необходимые классы ошибки:
const showInputError = function(formElement, inputElement, errorMessage, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(errorClass);
};

// Функция скрывает ошибку и удаляет классы ошибки:
const hideInputError = function(formElement, inputElement, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
  inputElement.classList.remove(errorClass);
}

// Функция ставит слушателей на все инпуты:
const setEventListeners = (fieldset, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {
  const inputList = Array.from(fieldset.querySelectorAll(inputSelector));
  const buttonElement = fieldset.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(fieldset, inputElement, rest);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

// Функция ищет первый невалидный инпут в форме, чтобы решить, что toggleButtonState делать с кнопкой:
function hasInvalidInput(inputList) {
  return inputList.some( (inputElement) => {
    return !inputElement.validity.valid;
  })
}

const disableBtn = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
}

const enableBtn = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
}

// Функция переключает кнопку сабмита между активная-неактивная в зависимости от валидности формы:
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    disableBtn(buttonElement, inactiveButtonClass);
  } else {
    enableBtn(buttonElement, inactiveButtonClass);
  }
}

const enableValidation = ({formSelector, fieldsetSelector, inactiveButtonClass, submitButtonSelector, ...rest}) => {
  // Избавляемся от дефолтного поведения всех форм на странице:
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      disableBtn(evt.target.querySelector(submitButtonSelector), inactiveButtonClass)
    });
    // В каждой форме находим филдсеты и посылаем их на добавление слушателей дальше,
    // вместе со всеми параметрами ...rest
    const fieldsetList = Array.from(formElement.querySelectorAll(fieldsetSelector));
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset, config);
    }
  )});
};

// Вызываем функцию валидацию с параметром — объектом конфига:
enableValidation(config);


