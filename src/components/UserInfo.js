class UserInfo {
  constructor({userNameSelector, userOccupationSelector, userAvatarSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userOccupation = document.querySelector(userOccupationSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  //метод getUserInfo возвращает объект с данными пользователя
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userOccupation: this._userOccupation.textContent,
    }
  }

  //устанавливаю данные пользователя на странице
  setUserProfile(userData) {
    this._userName.textContent = userData.name;
    this._userOccupation.textContent = userData.about;
    this.userId = userData._id;
  }

  //устанавливаю аватар пользователя на странице
  setAvatar(userData) {
    this._userAvatar.src = userData.avatar;
  }

}

export {UserInfo};