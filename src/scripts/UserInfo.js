export default class UserInfo {
  /*
  —— UserInfo:
  отвечает за управление отображением информации о пользователе на странице

  —— getUserInfo: возвращает объект с данными пользователя
  —— setUserInfo: принимает новые данные пользователя и добавляет их на страницу
  */
  constructor({userSelectors}) {
    this.userName = userSelectors.username;
    this.userDescription = userSelectors.description;
  }

  getUserInfo() {
    return {
      username: this.userName.textContent,
      description: this.userDescription.textContent
    }
  }

  setUserInfo(userInfo) {
    this.userName.textContent = userInfo.username;
    this.userDescription.textContent = userInfo.description;
  }
}
