import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup)
    this.popup = popup;
  }

  open() {
    const lightboxCaption = this.popup.querySelector('.lightbox__caption');
    const lightboxImage = this.popup.querySelector('.lightbox__image');

    lightboxCaption.textContent = this._cardTitle;
    lightboxImage.src = this._cardImage;
    lightboxImage.alt = this._cardTitle;

    super.open();
  }
}
