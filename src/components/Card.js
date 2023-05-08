class Card {
   constructor (data, templateCard, handleCardClick, handleLikeClick, handleDeleteLikeClick, userId) {
    this._link = data.link || data.photoLink;
    this._name = data.name || data.photoName;
    this._idCard = data._id;
    // this._idOwner = data.owner._id; // подумать нужен ли owner
    this._likes = data.likes ? data.likes.length : 0;
    this._likesArr = data.likes;
    this._templateCard = templateCard;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteLikeClick = handleDeleteLikeClick;
    this._userId = userId;
  }

  //метод _getTemplate создаёт пустой каркас (вёрстку) карточки из шаблона и возвращает его
  _getTemplate() {
    //клонирую шаблон карточки
    const _element = this._templateCard.querySelector('.card').cloneNode(true);
    return _element;
  }

  //метод _likeCard устанавливает/снимает лайк 
  async _likeCard() {
    this._buttonLike.classList.toggle('card__like-button_active');
    if(this._buttonLike.classList.contains('card__like-button_active')) {
      this.newCountLike = await this._handleLikeClick(this._idCard);
    }
    else {
      this.newCountLike = await this._handleDeleteLikeClick(this._idCard);
    }

    this._likeCounter.textContent = this.newCountLike.likes.length;
  }

  //метод _deleteCard удаляет карточку
  _deleteCard() {
    this.cardElement.remove();
  }

  //метод _setEventListeners устанавливает слушателей на лайк, корзину и картинку
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => this._likeCard());
    this._buttonDelete.addEventListener('click', () => this._deleteCard());
    this._photoImg.addEventListener('click', () => this._handleCardClick(this._link, this._name));
  }

  //метод createCard наполняет каркас (вёрстку) пустой карточки данными (картинка + название)
  createCard() {
    this.cardElement = this._getTemplate();
    this._photoImg = this.cardElement.querySelector('.card__img');
    this._photoTitle = this.cardElement.querySelector('.card__title');
    this._likeCounter = this.cardElement.querySelector('.card__likes-counter');

    //наполняю содержимым из данных объекта, полученного на входе в класс
    this._photoImg.src = this._link;
    this._photoImg.alt = this._name;
    this._photoTitle.textContent = this._name;
    this._likeCounter.textContent = this._likes;


    //нахожу кнопку удаления картинки
    this._buttonDelete = this.cardElement.querySelector('.card__delete-button');

    // нахожу кнопку лайка 🤍
    this._buttonLike = this.cardElement.querySelector('.card__like-button');

    if (this._likesArr.some(element => element._id === this._userId)) {
        this._buttonLike.classList.add('card__like-button_active');
      };

    //вызываю метод, который устанавливает слушателей на кнопки лайк, удалить и на фото
    this._setEventListeners();
    
    //возвращаю готовую карточку
    return this.cardElement;
  }
}

export {Card};