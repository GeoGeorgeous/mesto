// array with names / links for default cards
const initialCards = [
  {
      name: 'Покровка',
      link: './images/card__Pokrovka.jpg'
  },
  {
      name: 'ЦУМ',
      link: './images/card__TeatralnyjProezd.jpg'
  },
  {
      name: 'Москва-сити',
      link: './images/card__MoscowCity.jpg'
  },
  {
      name: 'Мясницкая',
      link: './images/card__Myasnickaya.jpg'
  },
  {
      name: 'Чертаново',
      link: './images/card__Chertanovo.jpg'
  },
  {
      name: 'метро Добрынинская',
      link: './images/card__Dobryninskaya.jpg'
  }
];

const cardsContainer = document.querySelector('.cards__items'); // get the list of all the cards on the page
const cardTemplate = document.querySelector('#card').content; // get the card template

// this function gets an array (arr) and creates a new card using cardTemplate
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


