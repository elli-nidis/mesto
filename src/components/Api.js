class Api {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.token = config.headers.authorization;
    this.contentType = config.headers['Content-Type'];
  }

  //запрашиваю на сервере начальные карточки, получаю массив с объектами
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.token,
        'Content-Type': this.contentType
      }
    })
    .then(res => {
      if (res.ok) {
        //console.log(res.json());
        return res.json();
      }
      //если ошибка, отклоняю промисс
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  //запрашиваю на сервере данные пользователя, получаю объект
  getUser() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.token,
        'Content-Type': this.contentType
      }
    })
    .then(res => {
      if (res.ok) {
        //console.log(res.json());
        return res.json();
      }
      //если ошибка, отклоняю промисс
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  //меняю данные пользователя на сервере
  patchUser(data) {
    console.log('делаю апи патч юзер с параметрами: ' + data.userName + data.userOccupation);
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': this.contentType
      },
      body: JSON.stringify({
        name: data.userName,
        about: data.userOccupation,
      })
    })
    .then(res => {
      if (res.ok) {
        //console.log(res.json());
        return res.json();
      }
      //если ошибка, отклоняю промисс
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  //меняю аватар на сервере
  patchAvatar(data) {
    console.log('делаю апи патч аватар');
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': this.contentType
      },
      body: JSON.stringify({
        avatar: data.avatarLink,
      })
    })
    .then(res => {
      if (res.ok) {
        //console.log(res.json());
        return res.json();
      }
      //если ошибка, отклоняю промисс
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

   //отправляю новую карточку на сервер
   postNewCard(data) {
    console.log('делаю апи пост кард');
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': this.contentType
      },
      body: JSON.stringify({
        name: data.photoName,
        link: data.photoLink,
      })
    })
    .then(res => {
      if (res.ok) {
        //console.log(res.json());
        return res.json();
      }
      //если ошибка, отклоняю промисс
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // отправляю лайк на сервер
   putLike(idCard) {
    return fetch(`${this.baseUrl}/cards/${idCard}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this.token,
        'Content-Type': this.contentType
      },
    })
    .then(res => {
      if (res.ok) {
        //console.log(res.json());
        return res.json();
      }
      //если ошибка, отклоняю промисс
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // удаляю лайк с сервера
  deleteLike(idCard) {
    return fetch(`${this.baseUrl}/cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': this.contentType
      },
    })
    .then(res => {
      if (res.ok) {
        //console.log(res.json());
        return res.json();
      }
      //если ошибка, отклоняю промисс
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // другие методы работы с API
}

export {Api};