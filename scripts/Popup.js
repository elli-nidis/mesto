class Popup {
  constructor (popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeButton = this._popupElement.querySelector('.popup__close-button');
  }
  
  _handleEscClose(evt) {
    console.log('работает _handleEscClose');
    if (evt.key === 'Escape') {
      //если нажата клавиша esc, то закрываю открытый попап 
      this.close();
    }
  };

  _handleOverlayClose(evt) {
    console.log('работает _handleOverlayClose');
    if (evt.target.classList.contains('popup')) {
      ///если произошёл клик на оверлей, то закрываю попап 
      this.close();
    }
  };

  setEventListeners() {
    console.log('зашел в листнер');
    //устанавливаю слушателя на esc
    document.addEventListener('keydown', this._handleEscClose);

    //устанавливаю слушателя на крестик
    this._closeButton.addEventListener('click', this.close.bind(this));

    //устанавливаю слушателя на оверлей
    this._popupElement.addEventListener('click', this._handleOverlayClose.bind(this));
  }

  removeEventListeners() {
    console.log('зашел в удаление листнера');
    //удаляю слушателя с esc
    document.removeEventListener('keydown', this._handleEscClose);

    //удаляю слушателя с крестика
    this._closeButton.removeEventListener('click', this.close.bind(this));

    //удаляю слушателя с оверлея
    this._popupElement.removeEventListener('click', this._handleOverlayClose.bind(this));
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    
    //устанавливаю слушателей: крестик, esc, оверлей
    this.setEventListeners();
  }

  close() {
    console.log('работает close');
    this._popupElement.classList.remove('popup_opened');

    //удаляю слушателей с крестика, esc, оверлея
    this.removeEventListeners();
  }
  
}

export {Popup};