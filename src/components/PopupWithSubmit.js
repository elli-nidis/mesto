import { Popup } from "./Popup.js";

class PopupWithSubmit extends Popup {
  constructor({popupSelector}) {
    super(popupSelector);
    this._buttonSubmit = this._popupElement.querySelector('.popup__button');
  }

  //метод выбора действия по сабмиту - выношу из класса
  setSubmitAction(action) {
    console.log('устанавливаю action');
    this._handleSubmit = action;
  }

  //метод setEventListeners перезаписывает родительский метод: добавляет обработчик "сабмита"
  setEventListeners() {
    super.setEventListeners();
    this._buttonSubmit.addEventListener('click', evt =>{
      evt.preventDefault();
      this._handleSubmit();
    });
    }
    }

export {PopupWithSubmit};