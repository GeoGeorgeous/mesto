export default class Api {
// getCards(): получить список всех карточек с сервера в виде массива (GET)
// getUser(): получить данные пользователя на сервере  (GET)
// setUser(): заменить данные пользователя на сервере (PATCH)
// uploadCard(): добавить карточку на сервер (POST)
// deleteCard(): удалить карточку (DELETE)
// setAvatar(): заменить аватар (PATCH)
// setLike(): залайкать карточку (PUT)
// removeLike(): удалить лайк карточки (DELETE)

  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _fetchButCatch(url, init) {
    return fetch(url, init)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`))
    })
  }

  getUser() {
    return this._fetchButCatch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
  }

  setUser(userData) {
    return this._fetchButCatch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    });
  }

  setAvatar(imgSrc) {
    return this._fetchButCatch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: imgSrc
      })
    });
  }

  uploadCard(card) {
    return this._fetchButCatch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    });
  }

  getCards() {
    return this._fetchButCatch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
  }

  deleteCard(card) {
    return this._fetchButCatch(`${this._baseUrl}/cards/${card._id}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  setLike(card) {
    return this._fetchButCatch(`${this._baseUrl}/cards/likes/${card._id}`, {
      method: 'PUT',
      headers: this._headers
    });
  }

  removeLike(card) {
    return this._fetchButCatch(`${this._baseUrl}/cards/likes/${card._id}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

}
