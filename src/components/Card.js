class Card {
  constructor (data, templateCard, handleCardClick) {
    this._link = data.link || data.photoLink;
    this._name = data.name || data.photoName;
    this._templateCard = templateCard;
    this._handleCardClick = handleCardClick;
  }

  //метод _getTemplate создаёт пустой каркас (вёрстку) карточки из шаблона и возвращает его
  _getTemplate() {
    //клонирую шаблон карточки
    const _element = this._templateCard.querySelector('.card').cloneNode(true);
    return _element;
  }

  //метод _likeCard устанавливает/снимает лайк 
  _likeCard() {
    this._buttonLike.classList.toggle('card__like-button_active');
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

    //наполняю содержимым из данных объекта, полученного на входе в класс
    this._photoImg.src = this._link;
    this._photoImg.alt = this._name;
    this._photoTitle.textContent = this._name;

    //нахожу кнопку удаления картинки
    this._buttonDelete = this.cardElement.querySelector('.card__delete-button');

    // нахожу кнопку лайка 🤍
    this._buttonLike = this.cardElement.querySelector('.card__like-button');

    //вызываю метод, который устанавливает слушателей на кнопки лайк, удалить и на фото
    this._setEventListeners();
    
    //возвращаю готовую карточку
    return this.cardElement;
  }
}

export {Card};