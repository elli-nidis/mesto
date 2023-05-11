import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__button');
    this._submitButtonText = this._submitButton.textContent;
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._handlerFormSubmit = (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues())
    }
  }

  //метод renderLoading устанавливает/снимает перлоадер на кнопку сабмит
  renderLoading(isLoading, loadingText = 'Сохранение...') {
    if(isLoading) {
      this._submitButton.textContent = loadingText;
    }
    else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  //метод _getInputValues() собирает данные всех полей формы
  _getInputValues() {
    const inputs = {};
    this._inputList.forEach(input => inputs[input.name] = input.value);
    return inputs;
  }

  //метод setInputValues вставляет данные в инпуты формы
  setInputValues(inputs) {
    this._inputList.forEach((input) => {
      input.value = inputs[input.name];
    })
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