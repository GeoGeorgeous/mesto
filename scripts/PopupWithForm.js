import Popup from './Popup.js'
import {config} from './utils.js'

export default class PopupWithImage extends Popup {
  /*
  —— PopupWithImage:
  отвечает за управление отображением попапа с картинкой

  —— _getInputValues: возвращает объект с данными пользователя
  —— setEventListeners: принимает новые данные пользователя и добавляет их на страницу
  —— close:
  */
  constructor(popup, submitCallback, validator) {
    super(popup);
    this.popup = popup;
    this._submitCallback = submitCallback;
    this._submitButton = this.popup.querySelector('.popup__container');
    this._form = this.popup.querySelector(config.formSelector)
    this._validator = validator // используется для очистки ошибок при закрытии формы
  }

  _getInputValues() {
    accountInputName.value = accountName.textContent;
    accountInputDesc.value = accountDescription.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('submit', this._submitCallback);
  }

  close() {
    super.close();
    this._form.reset();
    this._validator.removeErrors();
  }

}
