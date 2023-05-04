class Api {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.token = config.headers.authorization;
    this.contentType = config.headers['Content-Type'];
  }

  getInitialCards() {
    return fetch(this.baseUrl, {
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

  // другие методы работы с API
}

export {Api};