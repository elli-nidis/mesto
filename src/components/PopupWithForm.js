import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector('.popup__form');
    this._handlerFormSubmit = (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues())
    }
  }

  //метод _getInputValues() собирает данные всех полей формы
  _getInputValues() {
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    const inputs = {};
    this._inputList.forEach(input => inputs[input.name] = input.value);
    // console.log({inputs});

    //возвращаю объект
    return inputs;
  }

  //метод setEventListeners перезаписывает родительский метод: добавляет обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handlerFormSubmit );
  }

  //метод close перезаписывает родительский метод: добавляет сброс формы
  close() {
    this._form.reset();
    super.close();
  }

}

export {PopupWithForm};