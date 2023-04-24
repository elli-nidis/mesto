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

  //метод setUserInfo принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({userName, userOccupation}) {
    this._userName.textContent = userName;
    this._userOccupation.textContent = userOccupation;
  }
}

export {UserInfo};