export default class Api {
// getCards: получить список всех карточек в виде массива (GET)
// getUser: получить данные пользователя (GET)

// добавить карточку (POST)
// удалить карточку (DELETE)
// получить данные пользователя (GET)
// заменить данные пользователя (PATCH)
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

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
  }

}
