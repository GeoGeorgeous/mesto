const cardsContainer = document.querySelector('.cards__items'); // get container for all cards (ul)
const cardTemplate = document.querySelector('#card').content; // get the card template (li)

function createCard(array) {
  // function gets an array and return a new card (HTML) with
  // itle, image source, alt, likes actions, delete actions and lightbox
  //
  // array should contain array.name and array.link
  //
  // it does not add new card into DOM
  let card = cardTemplate.cloneNode(true);
  card.querySelector('.card__title').textContent = array.name;
  card.querySelector('.card__image').src = array.link;
  card.querySelector('.card__image').alt = array.name;
  card.querySelector('.card__like-button').addEventListener('click', function (event) {
    event.target.classList.toggle('card__like-button_active');
  })
  card.querySelector('.card__delete-button').addEventListener('click', function (event) {
    event.target.parentElement.remove();
  })
  addLightbox(card);
  return card;
}

function renderCard(card) {
  // add card into DOM
  cardsContainer.prepend(card);
}

let initialCardsReversed = initialCards.reverse(); // reverse initialCards array so it looks like in Figma

initialCardsReversed.forEach(function(element) {
  // create and render default cards ("from the box") into the page
  // cards are taken from initialCards.js
  renderCard(createCard(element));
});
