class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {

  }

  close() {

  }

  __handleEscClose() {

  }

  setEventListeners() {
    
  }
}

export {Popup};

Принимает в конструктор единственный параметр — селектор попапа.
Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.