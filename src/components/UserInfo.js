export default class UserInfo {
  /*
  —— UserInfo:
  отвечает за управление отображением информации о пользователе на странице

  —— getUserInfo: возвращает объект с данными пользователя
  —— setUserInfo: принимает новые данные пользователя и добавляет их на страницу
  */
  constructor(userElements) {
    this._userNameElement = userElements.name;
    this._userDescriptionElement = userElements.about;
    this._userAvatarElement = userElements.avatar;
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      about: this._userDescriptionElement.textContent
    }
  }

  setUserInfo(userInfo) {
    this._userNameElement.textContent = userInfo.name;
    this._userDescriptionElement.textContent = userInfo.about;
    this.setUserAvatar(userInfo.avatar);
  }

  setUserAvatar(imageSrc) {
    this._userAvatarElement.src = imageSrc;
  }
}
