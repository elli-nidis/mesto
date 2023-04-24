class Popup {
  constructor (popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeButton = this._popupElement.querySelector('.popup__close-button');
  }
  
  //метод _handleEscClose закрывает попап, если нажат esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      //если нажата клавиша esc, то закрываю открытый попап 
      this.close();
    }
  };

  //метод _handleOverlayClose закрывает попап, если произошёл клик по оверлею
  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      ///если произошёл клик на оверлей, то закрываю попап 
      this.close();
    }
  };

  //метод setEventListeners устанавливает слушателей
  setEventListeners() {
    //устанавливаю слушателя на esc
    document.addEventListener('keydown', this._handleEscClose);

    //устанавливаю слушателя на крестик
    this._closeButton.addEventListener('click', this.close.bind(this));

    //устанавливаю слушателя на оверлей
    this._popupElement.addEventListener('click', this._handleOverlayClose.bind(this));
  }

  //метод removeEventListeners удаляет слушателей
  _removeEventListeners() {
    //удаляю слушателя с esc
    document.removeEventListener('keydown', this._handleEscClose);

    //удаляю слушателя с крестика
    this._closeButton.removeEventListener('click', this.close.bind(this));

    //удаляю слушателя с оверлея
    this._popupElement.removeEventListener('click', this._handleOverlayClose.bind(this));
  }

  //метод open открывает попап
  open() {
    this._popupElement.classList.add('popup_opened');

    //устанавливаю слушателей: крестик, esc, оверлей
    this.setEventListeners();
  }

  //метод close закрывает попап
  close() {
    //console.log('работает close');
    this._popupElement.classList.remove('popup_opened');

    //удаляю слушателей с крестика, esc, оверлея
    this._removeEventListeners();
  }
  
}

export {Popup};