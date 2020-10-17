import Popup from './Popup.js'

export default class PopupWithSubmit extends Popup {
    /*
  —— PopupWithSubmit:
  отвечает за управление отображением попапа с submit

  */
  constructor(popup, handleFormSubmit) {
    super(popup)
    this._popup = popup;
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popup.querySelector('.popup__container');
    this._data = null;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('submit', (evt) =>{
      evt.preventDefault(); // избавляемся от стандартного поведения
      this._handleFormSubmit(this._data);
    });
  }

  open(data) {
    this._data = data;
    super.open();
  }

}
