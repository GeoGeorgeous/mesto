export default class Card {
  constructor(values, templateSelector) {
    this._cardTitle = values.data.name; // Название карточки
    this._cardImage = values.data.link; // Ссылка на изображение
    this._cardLikes = values.data.likes; // Массив лайков
    this._cardOwner = values.data.owner; // ID владельца карточки
    this._templateSelector = templateSelector;
    this._handleCardClick = values.handleCardClick;
    this._handleLikeClick = values.handleLikeClick;
    this._handleDeleteClick = values.handleDeleteIconClick;

    this._userID = values.myId;
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
    // Добаляем слушатель на кнопку лайка:
    this._likeButton.addEventListener('click', this._handleLikeClick)

    // Добавляем слушатель на кнопку корзины:
    this._deleteButton.addEventListener('click', this._handleDeleteClick);

    // Добавляем слушатель lightbox:
    this._cardImageElement.addEventListener('click', this._handleCardClick);
  }

  generateCard() {
    this._cloneTemplate(); // получаем разметку пустой карточки из template

    // Получаем разметку кнопок лайка и корзины
    this._likeButton = this._cardElement.querySelector('.card__like-button');
    this._deleteButton = this._cardElement.querySelector('.card__delete-button');

    // Находим разметку изображения и заголовка:
    this._cardImageElement = this._cardElement.querySelector('.card__image');
    this._cardTitleElement = this._cardElement.querySelector('.card__title');
    this._cardLikesElement = this._cardElement.querySelector('.card__likes');

    // Подставляем название и изображение и alt в пустую карточку:
    this._cardImageElement.src = this._cardImage;
    this._cardTitleElement.textContent = this._cardTitle;
    this._cardImageElement.alt = this._cardTitle;

    // Подставляем количество лайков:
    this.renderAmountOfLikes(this._cardLikes.length);

    // Подставляем нажатый лайк:
    if (this._youLiked()) {
      this.toggleLikeBtnState();
    }


    // Навешиваем слушателей событий:
    this._setEventListeners();

    // // Удаляем корзину на чужих карточках:
    this._checkOwner();
    if (!this._yourCard) {
      this._deleteButton.remove();
    }

    // Возвращаем готовую карточку
    return this._cardElement;
  }

  renderAmountOfLikes(source) {
    this._cardLikesElement.textContent = source;
  }

  _youLiked() {
    return this._cardLikes.some(cardLover => {
      return (cardLover._id === this._userID)
    });
  }

  toggleLikeBtnState() {
    // Ставит / удаляет лайк
    this._likeButton.classList.toggle('card__like-button_active');
  }

  removeCard() {
    // Удаляет карточку
    this._cardElement.remove();
    this._cardElement = null;
  }

  _checkOwner() {
    this._cardOwner._id === this._userID
    ? this._yourCard = true
    : this._yourCard = false;
  }
}
