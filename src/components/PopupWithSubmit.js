import Popup from './Popup.js'

export default class PopupWithSubmit extends Popup {
    /*
  —— PopupWithSubmit:
  отвечает за управление отображением попапа с submit

  */
  constructor(popup, submitCallback) {
    super(popup)
    this._popup = popup;
    this._handleFormSubmit = submitCallback;
    this._form = this._popup.querySelector('.popup__container');
    this._submitButton = this._form.querySelector('.popup__save-button');
    this._element = null;
    this._obj = null;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) =>{
      evt.preventDefault(); // избавляемся от стандартного поведения
      this._handleFormSubmit(this._element, this._obj, evt)
    });
  }

  open(element, object) {
    this._element = element;
    this._obj = object;
    super.open();
  }

}
