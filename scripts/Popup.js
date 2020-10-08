export default class Popup {
  /*
    —— PopUp:
    отвечает за открытие и закрытие попапа

    —— _handleEscClose: метод содержит логику закрытия попапа клавишей Esc
    —— _handleMainClose: метод содержит логику закрытия попапа кликов на оверлей и иконку крестика
    —— open: открытие попапа
    —— close: закрытие попапа
    —— setEventListeners: метод добавляет слушатель клика иконке закрытия попапа
    —— removeEventListeners: метод удаляет слушатели
  */
 
  constructor(popup) {
    this.popup = popup;
    this._openedSelector = 'popup_opened'; // селектор открытого попапа

    // обертки для коллбэков eventListener:
    this._handleEscCloseWrapper = this._handleEscClose.bind(this);
    this.__handleMainCloseWrapper = this._handleMainClose.bind(this);
  }

  _handleEscClose(evt) {
    // обработчик эксейпа
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleMainClose(evt) {
    // обработчик оверлея / иконки закрытия
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')){
      this.close();
    }
  }

  open() {
    this.popup.classList.add(this._openedSelector);
    this.setEventListeners();
  }

  close() {
    this.popup.classList.remove(this._openedSelector);
    this.removeEventListeners();
  }

  setEventListeners() {
    this.popup.addEventListener('click', this.__handleMainCloseWrapper);
    document.addEventListener('keyup', this._handleEscCloseWrapper);
  }

  removeEventListeners() {
    document.removeEventListener('keyup', this._handleEscCloseWrapper);
    this.popup.removeEventListener('click', this.__handleMainCloseWrapper);
  }

}
