
class Card {
  constructor (data, templateCard, handleImageClick) {
    this.link = data.link;
    this.name = data.name;
    this.templateCard = templateCard;
    this.handleImageClick = handleImageClick;

  }
  //создаю пустой каркас (вёрстку) карточки из шаблона и возвращаю его
  _getTemplate() {
    //клонирую шаблон карточки
    const element = this.templateCard.querySelector('.card').cloneNode(true);
    return element;
  }

  //метод устанавливает/снимает лайк 
  _likeCard() {
    this.buttonLike.classList.toggle('card__like-button_active');
  }

  //метод удаляет карточку
  _deleteCard() {
    this.cardElement.remove();
  }

  //метод открывает попап photo-zoom

  _openPhotoZoomPopup() {

    const photoZoomPopup = document.querySelector('.popup_type_photo-zoom');
    //checkOpenedAddPhotoPopup(photoZoomPopup); //переименовать ф-цию
    this.handleImageClick(photoZoomPopup);
    
    this.photoZoomImg = photoZoomPopup.querySelector('.photo__img');
    this.photoZoomTitle = photoZoomPopup.querySelector('.photo__title');

    this.photoZoomImg.src = this.link;
    this.photoZoomImg.alt = this.name;
    this.photoZoomTitle.textContent = this.name;

  }

  //Вешаю слушателей
  _setEventListeners() {
    this.buttonLike.addEventListener('click', () => this._likeCard());
    this.buttonDelete.addEventListener('click', () => this._deleteCard());
    this.photoImg.addEventListener('click', () => this._openPhotoZoomPopup());
  }

  //создаю пустой каркас (вёрстку) карточки из шаблона и возвращаю его
  //наполняю каркас (вёрстку) пустой карточки данными (картинка + название)
  createCard() {
    //this.cardElement = this.templateCard.querySelector('.card').cloneNode(true);
    this.cardElement = this._getTemplate();
    this.photoImg = this.cardElement.querySelector('.card__img');
    this.photoTitle = this.cardElement.querySelector('.card__title');

    //наполняю содержимым из данных объекта, полученного на входе в ф-цию
    this.photoImg.src = this.link;
    this.photoImg.alt = this.name;
    this.photoTitle.textContent = this.name;

    //нахожу кнопку удаления картинки
    this.buttonDelete = this.cardElement.querySelector('.card__delete-button');

    // нахожу кнопку лайка 🤍
    this.buttonLike = this.cardElement.querySelector('.card__like-button');

    //вызываю метод, который устанавливает слушателей на кнопки лайк, удалить, посмотреть фото
    this._setEventListeners();
    
    //возвращаю готовую карточку
    return this.cardElement;
  }
}

export {Card};