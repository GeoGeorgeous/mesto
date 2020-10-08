import PopupWithForm from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popup, submitCallback) {
    super(popup);
    this.popup = popup;
    this._submitCallback = submitCallback();
    this._submitButton = this.popup.querySelector('.popup__container');
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
    
  }

}
