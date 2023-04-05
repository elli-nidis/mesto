class FormValidator {
  constructor(data, form) {
    this._data = data;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._form = document.querySelector(form);
  }

  //метод hasInvalidInput проверяет наличие невалидного поля в форме
  _hasInvalidInput() {
    return this._inputList.some(input => {
      //проверяю наличие хотя бы одного невалидного поля в массиве инпутов одной формы
      return !input.validity.valid;
    });
  };

  //метод disableButtonState деактивирует кнопку сабмит
  disableButtonState() {
    //добавляю класс модификатора, устанавливаю деактивирующий кнопку атрибут
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  };

  //метод activateButtonState активирует кнопку сабмит
  _activateButtonState() {
    //удаляю класс модификатора, удаляю атрибут, деактивирующий кнопку
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }

  //метод _toggleButtonState переключает состояние доступности кнопки сабмит в зависимости от наличия невалидных полей в форме
  _toggleButtonState() {
    if(this._hasInvalidInput()) {
      //если в форме есть невалидное поле,
      // делаю кнопку неактивной - вызываю для этого функцию disableButtonState
      this.disableButtonState();
    }
    else {
      //иначе делаю кнопку активной - вызываю для этого функцию activateBUttonState
      this._activateButtonState();
    }
  };

  //метод _findErrorPlace ищет место (тега), в котором выводится ошибка
  _findErrorPlace(input) {
    //нахожу атрибут name у инпута
    this._inputName = input.getAttribute('name');

    //нахожу тег, в котором будет показана ошибка. Класс искомого тега содержит в себе [name] валидируемого поля
    this._errorPlace = document.querySelector(`.${this._inputName}-error`);

    // возвращаю тег, в котором будет выведен текст ошибки
    return this._errorPlace;
  };

  //метод _removeStyleErrorInput убирает стили для невалидного поля
  _removeStyleErrorInput(input) {
    input.classList.remove(this._inputErrorClass);
  };

  //метод _hideInputError скрывает текст ошибки валидации поля
  _hideInputError() {
    //удаляю контент, удаляю класс
    this._errorPlace.textContent = '';
    this._errorPlace.classList.remove(this._errorClass);
  };

  //метод _setStyleErrorInput устанавливает слили для невалидного поля
  _setStyleErrorInput(input) {
    input.classList.add(this._inputErrorClass);
  };

  //метод _showInputError показывает текст ошибки валидации поля
  _showInputError(input) {
    //устанавливаю текст ошибки, добавляю класс, который делает тег с текстом ошибки видимым
    this._errorPlace.textContent = input.validationMessage;
    this._errorPlace.classList.add(this._errorClass);
  };

  //метод _checkInputValidity проверяет поля на валидность
  _checkInputValidity(input) {
    if(input.validity.valid) {
      //если поле валидно, скрываю ошибку:
      //нахожу место вывода ошибки, которую нужно скрыть. Место ищет метод _findErrorPlace и возвращает нужный тег
      this._errorPlace = this._findErrorPlace(input);

      //вызываю метод, изменяющий стиль инпута
      this._removeStyleErrorInput(input);

       //вызываю метод, который скрывает ошибку
       this._hideInputError(this._errorPlace);
    }
    else {
      //если поле не валидно, показываю ошибку:
      //нахожу место вывода ошибки, которую нужно показать. Место ищет метод _findErrorPlace и возвращает нужный тег
      this._errorPlace = this._findErrorPlace(input);
  
      //вызываю метод, изменяющий стиль инпута
      this._setStyleErrorInput(input);
  
      //вызываю метод, который показывает ошибку
      this._showInputError(input);
    }
  };

  //метод enableValidation включает валидацию
  enableValidation(_form) {
    //отменяю стандартное поведение формы при сабмите
    this._form.addEventListener('submit', evt => evt.preventDefault());

    //нахожу все инпуты в текущей форме
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));

    //нахожу в текущей форме кнопку с функцией submit
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);

    //вызываю метод _toggleButtonState, который управляет состоянием кнопки сабмит
    this._toggleButtonState();

    //прохожусь по инпутам, навешиваю слушателя ошибок по событию ввода символа
    this._inputList.forEach(input => {
      input.addEventListener('input', evt => {
        //вызываю метод _checkInputValidity, который проверяет валидность поля
        this._checkInputValidity(input);

        //вызываю метод _toggleButtonState, который управляет состоянием кнопки сабмит
        this._toggleButtonState(input);
      })
    });
};
}

export {FormValidator};