class Popup {
  constructor (popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeButton = this._popupElement.querySelector('.popup__close-button');
  }
  
  _handleEscClose() {
    console.log('работает _handleEscClose');
    if (evt.key === 'Escape') {
      //если нажата клавиша esc, то закрываю открытый попап 
      this.close();
    }
  };

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');

  }

  setEventListeners() {
    this._closeButton.addEventListener('click', this.close);
  }
}

export {Popup};