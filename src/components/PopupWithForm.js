import Popup from './Popup.js'
import {config} from '../utils/utils.js'

export default class PopupWithForm extends Popup {
  /*
  —— PopupWithForm:
  отвечает за управление отображением попапа с формой

  —— _getInputValues: собирает данные всех полей формы и возвращает их в виде объекта
  —— setEventListeners: super + добавляет обработчик сабмита
  —— close: очищает форму и ошибки
  */
  constructor(popup, submitCallback, closeCallback) {
    super(popup);
    this._popup = popup;
    this._submitCallback = submitCallback;
    this._submitButton = this._popup.querySelector('.popup__container');
    this._form = this._popup.querySelector(config.formSelector)
    this._inputSelector = config.inputSelector;
    this._closeCallback = closeCallback // используется для очистки ошибок при закрытии формы
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
    this._submitButton.addEventListener('submit', (evt) =>{
      evt.preventDefault(); // избавляемся от стандартного поведения
      this._submitCallback(this._getInputValues());
    });
  }

  close() {
    this._submitButton.removeEventListener('submit', this._submitCallback); // без этого будет дублировать submit
    super.close();
    this._form.reset();
    this._closeCallback();
  }

}
