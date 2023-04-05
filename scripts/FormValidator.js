class FormValidator {
  constructor(data, form) {
    this.data = data;
    // this.formSelector = data.formSelector;
    this.inputSelector = data.inputSelector;
    this.submitButtonSelector = data.submitButtonSelector;
    this.inactiveButtonClass = data.inactiveButtonClass;
    this.inputErrorClass = data.inputErrorClass;
    this.errorClass = data.errorClass;
    // this.popupError = data.popupError;
    this.form = document.querySelector(form);
  }

  //метод проверки наличия невалидного поля в форме
  hasInvalidInput() {
    console.log('метод hasInvalidInput работает');
    return this.inputList.some(input => {
      console.log('!input.validity.valid ' + !input.validity.valid);
      //проверяю наличие хотя бы одного невалидного поля в массиве инпутов одной формы
      return !input.validity.valid;
    });
  };

    //метод деактивации кнопки сабмит
  disableButtonState() {
    console.log('метод disableButtonState работает');
    //добавляю класс модификатора, устанавливаю деактивирующий кнопку атрибут
    this.buttonElement.classList.add(this.inactiveButtonClass);
    this.buttonElement.setAttribute('disabled', true);
  };

  //метод активации кнопки сабмит
  activateButtonState() {
    console.log('метод activateButtonState работает');
    //удаляю класс модификатора, удаляю атрибут, деактивирующий кнопку
    this.buttonElement.classList.remove(this.inactiveButtonClass);
    this.buttonElement.removeAttribute('disabled');
  }

  //метод переключения состояния доступности кнопки сабмит в зависимости от наличия невалидных полей в форме
  toggleButtonState() {
    console.log('метод toggleButtonState работает');
    if(this.hasInvalidInput()) {
      //если в форме есть невалидное поле,
      // делаю кнопку неактивной - вызываю для этого функцию disableButtonState
      this.disableButtonState();
    }
    else {
      //иначе делаю кнопку активной - вызываю для этого функцию activateBUttonState
      this.activateButtonState();
    }
  };

  //метод поиска места (тега), в котором выводится ошибка
  findErrorPlace(input) {
    console.log('работает метод findErrorPlace');
    //нахожу атрибут name у инпута
    this.inputName = input.getAttribute('name');
  
    //нахожу тег, в котором будет показана ошибка. Класс искомого тега содержит в себе [name] валидируемого поля
    this.errorPlace = document.querySelector(`.${this.inputName}-error`);
  
    // возвращаю тег, в котором будет выведен текст ошибки
    return this.errorPlace;
  };


  //метод убирает слили для невалидного поля
  removeStyleErrorInput(input) {
    console.log('работает метод removeStyleErrorInput');
    input.classList.remove(this.inputErrorClass);
  };

  //метод скрывает текст ошибки валидации поля
  hideInputError() {
    console.log('работает метод hideInputError');
    //удаляю контент, удаляю класс
    this.errorPlace.textContent = '';
    this.errorPlace.classList.remove(this.errorClass);
  };


  //метод устанавливает слили для невалидного поля
  setStyleErrorInput(input) {
    console.log('работает метод setStyleErrorInput');
    input.classList.add(this.inputErrorClass);
  };

  //метод показывает текст ошибки валидации поля
  showInputError(input) {
    console.log('работает метод showInputError');
    //устанавливаю текст ошибки, добавляю класс, который делает тег с текстом ошибки видимым
    this.errorPlace.textContent = input.validationMessage;
    this.errorPlace.classList.add(this.errorClass);
  };
  

  //метод проверки поля на валидность
  checkInputValidity(input) {
    console.log('я внутри checkInputValidity, мой инпут ' + input);
    if(input.validity.valid) {
      //если поле валидно, скрываю ошибку:
      //нахожу место вывода ошибки, которую нужно скрыть. Место ищет функция findErrorPlace и возвращает нужный тег
      this.errorPlace = this.findErrorPlace(input);
  
      //вызываю функцию, изменяющую стиль инпута
      this.removeStyleErrorInput(input);
  
       //вызываю функцию, которая скрывает ошибку
       this.hideInputError();
    }
    else {
      //если поле не валидно, показываю ошибку:
      //нахожу место вывода ошибки, которую нужно показать. Место ищет ф-ция findErrorPlace и возвращает нужный тег
      this.errorPlace = this.findErrorPlace(input);
  
      //вызываю функцию, изменяющую стиль инпута
      this.setStyleErrorInput(input);
  
      //вызываю функцию, которая показывает ошибку
      this.showInputError(input);
    }
  };

//метод включения валидации
enableValidation(form) {
  console.log('метод валидации работает');
  console.log(this.form);
    //отменяю стандартное поведение формы при сабмите
    //this.form.addEventListener('submit', evt => evt.preventDefault());

    //нахожу все инпуты в текущей форме
    this.inputList = Array.from(this.form.querySelectorAll(this.inputSelector));
    console.log(this.inputList);

    //нахожу в текущей форме кнопку с функцией submit
    this.buttonElement = this.form.querySelector(this.submitButtonSelector);
    console.log(this.buttonElement);

    //вызываю функцию toggleButtonState, которая управляет состоянием кнопки сабмит
    this.toggleButtonState();

    //прохожусь по инпутам, навешиваю слушателя ошибок по событию ввода символа
    this.inputList.forEach(input => {
      input.addEventListener('input', evt => {
        //вызываю функцию checkInputValidity, которая проверяет валидность поля
        this.checkInputValidity(input);

        //вызываю функцию toggleButtonState, которая управляет состоянием кнопки сабмит
        this.toggleButtonState(input);
      })
    });
  
};

}

export {FormValidator};