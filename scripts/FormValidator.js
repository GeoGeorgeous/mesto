import {
  config}
from './utils.js'


class FormValidator {
  /*
  —— enableValidation:
  избавляемся от дефолт. поведения формы;
  кнопка в disbaled после отправки формы.

  ↳ —— _getFieldSets: находим все филдсеты формы;
    ↳ —— _setEventListeners: input EventListener на каждый инпут в филдсете / проверяем начальный статус submit;
      ↳ —— _toggleButtonState: переключает submit в зависимости от результата _hasInvalidInput
        ↳ —— _hasInvalidInput: проверяет форму на наличие невалидных инпутов
        ↳ —— _disableBtn: submit в disabled;
        ↳ —— _enableBtn: submit в enabled;
      ↳ —— _checkInputValidity: проверяет валидность инпута;
        ↳ —— _showInputError: показываем ошибку;
        ↳ —— _hideInputError: скрываем ошибку.

  —— removeErrors:
  Метод убирает сообщения об ошибках из формы.
  */

  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._fieldsetSelector = config.fieldsetSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass; // Не используется, но оставим на случай ошибок на ревью :)
    this._errorClass = config.errorClass;

    this._form = form; // Валидируемая форма
    this._submitBtn = this._form.querySelector(this._submitButtonSelector) // Кнопка Submit
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement, inputElement.validationMessage);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(this._errorClass);
  }

  _hasInvalidInput(inputList) {
      return inputList.some((inputValue) => {
        return !inputValue.validity.valid;
      })
  }

  _enableBtn() {
    this._submitBtn.classList.remove(this._inactiveButtonClass);
    this._submitBtn.disabled = false;
  }

  _disableBtn() {
    this._submitBtn.classList.add(this._inactiveButtonClass);
    this._submitBtn.disabled = true;
  }

  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._disableBtn();
    } else {
      this._enableBtn();
    }
  }

  _setEventListeners() {
    // Записываем массив всех филдсетов в fieldSetList:
    const fieldSetList = this._getFieldSets();
    // Для каждого филдсета..
    fieldSetList.forEach((fieldset) => {
      //.. создаем список инпутов:
      const inputList = Array.from((fieldset.querySelectorAll('.popup__form-item')));
      this._toggleButtonState(inputList); // Определим начальный статус кнопки submit
      inputList.forEach((inputElement) => {
        // Для кажого инпута..
        inputElement.addEventListener('input', () => {
          // ..слушатель на валидность
          this._checkInputValidity(inputElement);
          // ..слушатель на переключение submit:
          this._toggleButtonState(inputList)
        });
      });
    });
  }

  _getFieldSets() {
    // Возвращает массив всех филдсетов формы:
    return Array.from(this._form.querySelectorAll(this._fieldsetSelector));
  }

  removeErrors() {
    // Метод убирает сообщения об ошибках:
   const fieldset = this._getFieldSets();
   fieldset.forEach(fieldset => {
    const inputList = Array.from((fieldset.querySelectorAll('.popup__form-item')));
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
   })
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._disableBtn();
    })
    this._setEventListeners();
  }
}


export {config, FormValidator}
