import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    /*
  —— PopupWithImage:
  отвечает за управление отображением попапа с картинкой

  —— open: вставляет в попап картинку, заголовок и подпись к картинке
  */
  constructor(popup) {
    super(popup)
    this._popup = popup;
    this._lightboxCaption = this._popup.querySelector('.lightbox__caption');
    this._lightboxImage = this._popup.querySelector('.lightbox__image');
  }

  open(cardData) {
    this._lightboxCaption.textContent = cardData.title;
    this._lightboxImage.src = cardData.link;
    this._lightboxImage.alt = cardData.title;

    super.open();
  }
}
