class FormValidator {
  constructor(data, form) {
     this.data = data;
    // this.formSelector = data.formSelector;
     this.inputSelector = data.inputSelector;
     this.submitButtonSelector = data.submitButtonSelector;
    this.inactiveButtonClass = data.inactiveButtonClass;
    // this.inputErrorClass = data.inputErrorClass;
    // this.errorClass = data.errorClass;
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
    // inputList.forEach(input => {
    //   input.addEventListener('input', evt => {
    //     //вызываю функцию checkInputValidity, которая проверяет валидность поля
    //     checkInputValidity(input, errorClass, inputErrorClass);

    //     //вызываю функцию toggleButtonState, которая управляет состоянием кнопки сабмит
    //     toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    //   })
    // });
  
};

}

export {FormValidator};