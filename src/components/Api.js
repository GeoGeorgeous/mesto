export default class Api {
// getCards: получить список всех карточек с сервера в виде массива (GET)
// getUser: получить данные пользователя на сервере  (GET)
// setUser: заменить данные пользователя на сервере (PATCH)
// uploadCard: добавить карточку на сервер (POST)

// удалить карточку (DELETE)
// получить данные пользователя (GET)
// заменить аватар (PATCH)
// "залайкать" карточку (PUT)
// удалить лайк карточки (DELETE)
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._authorization = '25068d5b-79ef-423f-8b22-b9922c31ad6c';
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
  }

  setUser(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    });
  }

  uploadCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    });
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
  }

}
