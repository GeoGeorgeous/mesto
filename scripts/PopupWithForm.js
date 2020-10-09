import Popup from './Popup.js'
import {config} from './utils.js'

export default class PopupWithForm extends Popup {
  /*
  —— PopupWithForm:
  отвечает за управление отображением попапа с формой

  —— _getInputValues: собирает данные всех полей формы и возвращает их в виде объекта
  —— setEventListeners: super + добавляет обработчик сабмита
  —— close: очищает форму и ошибки
  */
  constructor(popup, submitCallback, validator) {
    super(popup);
    this.popup = popup;
    this._submitCallback = submitCallback;
    this._submitButton = this.popup.querySelector('.popup__container');
    this._form = this.popup.querySelector(config.formSelector)
    this._inputSelector = config.inputSelector;
    this._validator = validator // используется для очистки ошибок при закрытии формы
  }

  _getInputValues() {
    // Возвращает объект.
    // ключ = input name,
    // значение = value.
    const inputValues =
    Object
    .values(this._form)
    .reduce( (obj, field) => {
      obj[field.name] = field.value;
      return obj;
    }, {})
    return inputValues;
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
