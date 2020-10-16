import Popup from './Popup.js'

export default class PopupWithSubmit extends Popup {
    /*
  —— PopupWithImage:
  отвечает за управление отображением попапа с картинкой

  —— open: вставляет в попап картинку, заголовок и подпись к картинке
  */
  constructor(popup) {
    super(popup)
    this._popup = popup;
    this._submitButton = this._popup.querySelector('.popup__container');
  }

  setEventListeners() {
    super.setEventListeners();
    // this._submitButton.addEventListener('submit', (evt) => {
    //   evt.preventDefault(); // избавляемся от стандартного поведения
    //   this._handleSubmit();
    // });
  }

  // setSubmitAction(action) {
  //   this._handleSubmit = action;
  // }

}
