import {lightbox, showPopUp} from './index.js';

export default class Card {
  constructor(data, templateSelector) {
    this._cardTitle = data.name;
    this._cardImage = data.link
    this._templateSelector = templateSelector;
  }

  _cloneTemplate() {
    // Клонирует template и возвращает пустой клон:
    this._cardElement = document
    .querySelector(this._templateSelector)
    .content
    .cloneNode(true);
    return this._cardElement;
  }

  _setEventListeners() {
    // Получаем разметку кнопок лайка и корзины
    this._likeButton = this._cardElement.querySelector('.card__like-button');
    this._deleteButton = this._cardElement.querySelector('.card__delete-button');

    // Добаляем слушатель на кнопку лайка:
    this._likeButton.addEventListener('click', function (event) {
      event.target.classList.toggle('card__like-button_active');
    })

    // Добавляем слушатель на кнопку корзины:
    this._deleteButton.addEventListener('click', function (event) {
      event.target.parentElement.remove();
    })
  }

  _addLightBox(){
    this._cardImageElement.addEventListener('click', (evt) => {
      const lightboxCaption = lightbox.querySelector('.lightbox__caption');
      const lightboxImage = lightbox.querySelector('.lightbox__image');

      lightboxCaption.textContent = this._cardTitle;
      lightboxImage.src = this._cardImage;
      lightboxImage.alt = this._cardTitle;
      showPopUp(lightbox);
    });
  }

  generateCard() {
    this._cloneTemplate(); // получаем разметку пустой карточки из template

    // Находим разметку изображения и заголовка:
    this._cardImageElement = this._cardElement.querySelector('.card__image');
    this._cardTitleElement = this._cardElement.querySelector('.card__title');
    // Подставляем название и изображение и alt в пустую карточку:
    this._cardImageElement.src = this._cardImage;
    this._cardTitleElement.textContent = this._cardTitle;
    this._cardImageElement.alt = this._cardTitle;
    // Навешиваем слушателей событий:
    this._setEventListeners();
    // Добавляем Lightbox:
    this._addLightBox();
    // Вовзаращем готовую карточку
    return(this._cardElement);
  }

}
