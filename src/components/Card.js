export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick) {
    this._cardTitle = data.name;
    this._cardImage = data.link
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _cloneTemplate() {
    // Клонирует template и записывает пустой клон в this._cardElement:
    this._cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);
  }

  _setEventListeners() {
    // Получаем разметку кнопок лайка и корзины
    this._likeButton = this._cardElement.querySelector('.card__like-button');
    this._deleteButton = this._cardElement.querySelector('.card__delete-button');

    // Добаляем слушатель на кнопку лайка:
    this._likeButton.addEventListener('click', () => {
      this._likeCard();
    })

    // Добавляем слушатель на кнопку корзины:
    this._deleteButton.addEventListener('click', () => {
      // this._handleDeleteClick();
      this._removeCard();
    });

    // Добавляем слушатель lightbox:
    this._cardImageElement.addEventListener('click', this._handleCardClick);
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
    // Возваращем готовую карточку
    return this._cardElement;
  }

  _likeCard() {
    // Ставит лайк
    this._likeButton.classList.toggle('card__like-button_active');
  }

  _removeCard() {
    // Удаляет карточку
    this._cardElement.remove();
    this._cardElement = null;
  }

}
