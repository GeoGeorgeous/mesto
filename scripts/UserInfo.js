export default class UserInfo {
  /*
  —— UserInfo:
  отвечает за управление отображением информации о пользователе на странице

  —— getUserInfo: возвращает объект с данными пользователя
  —— setUserInfo: принимает новые данные пользователя и добавляет их на страницу
  */
  constructor({userInfo}) {
    this.userName = userInfo.userName;
    this.userDescription = userInfo.userDescription;
  }

  getUserInfo() {
    return {
      userName: this.userName.textContent,
      userDescription: this.userDescription.textContent
    }
  }

  setUserInfo(userInfo) {
    this.userName.textContent = userInfo.name
    this.userDescription.textContent = userInfo.desc
  }
}
