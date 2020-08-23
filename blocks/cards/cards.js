const cardsContainer = document.querySelector('.cards__items'); // get container for all cards (ul)
const cardTemplate = document.querySelector('#card').content; // get the card template (li)

// this function gets an array (arr) and creates a new card using cardTemplate
// arr that we use stored in /blocks/cards/initialCards.js
function initCards(arr) {
  arr.forEach(element => {
    // clone the template content
    const card = cardTemplate.cloneNode(true);
    // set card title,image and image alt
    card.querySelector('.card__title').textContent = element.name;
    card.querySelector('.card__image').src = element.link;
    card.querySelector('.card__image').alt = element.name;
    // add this new card to cardsContainer and move to next element
    cardsContainer.append(card);
  });
}

// initial default cards
initCards(initialCards);

// add new card via popup (used in popup.js)
function addCard(title, url) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.card__title').textContent = title;
  card.querySelector('.card__image').src = url;
  card.querySelector('.card__image').alt = title;
  cardsContainer.prepend(card);
}

const likeButton = cardsContainer.querySelectorAll('.card__like-button'); // array with all like buttons

likeButton.forEach(function (likebtn) {
  likebtn.addEventListener('click', function () {
    likebtn.classList.toggle('card__like-button_active');
  });
})

const deleteButton = cardsContainer.querySelectorAll('.card__delete-button'); // array with all delete buttons

deleteButton.forEach(function (deletebtn) {
  deletebtn.addEventListener('click', function () {
    deletebtn.parentElement.remove();
  });
})
