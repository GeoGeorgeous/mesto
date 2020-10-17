import Popup from './Popup.js'

export default class PopupWithSubmit extends Popup {
    /*
  —— PopupWithImage:
  отвечает за управление отображением попапа с картинкой

  —— open: вставляет в попап картинку, заголовок и подпись к картинке
  */
  constructor(popup, submitCallback) {
    super(popup)
    this._popup = popup;
    this._submitCallback = submitCallback;
    this._submitButton = this._popup.querySelector('.popup__container');
    this._data = null;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('submit', (evt) =>{
      evt.preventDefault(); // избавляемся от стандартного поведения
      this._submitCallback(this._data);
    });
  }

  open(data) {
    this._data = data;
    super.open();
  }

}
