class UserInfo {
  constructor({userNameSelector, userOccupationSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userOccupation = document.querySelector(userOccupationSelector);
  }

  //метод getUserInfo возвращает объект с данными пользователя
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userOccupation: this._userOccupation.textContent
    }
  }
}

export {UserInfo};