import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    /*
  —— PopupWithImage:
  отвечает за управление отображением попапа с картинкой

  —— open: вставляет в попап картинку, заголовок и подпись к картинке
  */
  constructor(popup) {
    super(popup)
    this.popup = popup;
  }

  open(cardData) {
    const lightboxCaption = this.popup.querySelector('.lightbox__caption');
    const lightboxImage = this.popup.querySelector('.lightbox__image');

    lightboxCaption.textContent = cardData.title;
    lightboxImage.src = cardData.link;
    lightboxImage.alt = cardData.title;

    super.open();
  }
}
