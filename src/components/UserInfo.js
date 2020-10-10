export default class UserInfo {
  /*
  —— UserInfo:
  отвечает за управление отображением информации о пользователе на странице

  —— getUserInfo: возвращает объект с данными пользователя
  —— setUserInfo: принимает новые данные пользователя и добавляет их на страницу
  */
  constructor(userElements) {
    this._userNameElement = userElements.username;
    this._userDescriptionElement = userElements.description;
  }

  getUserInfo() {
    return {
      username: this._userNameElement.textContent,
      description: this._userDescriptionElement.textContent
    }
  }

  setUserInfo(userInfo) {
    this._userNameElement.textContent = userInfo.username;
    this._userDescriptionElement.textContent = userInfo.description;
  }
}
