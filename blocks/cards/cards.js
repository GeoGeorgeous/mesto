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

// get the list of all the cards on the page
const cardsContainer = document.querySelector('.cards__items');
// get the card template
const cardTemplate = document.querySelector('#card').content;


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

function addCard(title, url) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.card__title').textContent = title;
  card.querySelector('.card__image').src = url;
  card.querySelector('.card__image').alt = title;
  cardsContainer.prepend(card);
}

