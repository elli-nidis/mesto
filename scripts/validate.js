/**
 * функция показывает текст ошибки валидации поля
 * @param {object} errorPlace тег, который нужно показать
 * @param {object} input поле, для которого показывается текст ошибки
 * @param {string} errorClass селектор класса
 */
function showInputError(errorPlace, input, errorClass) {
  //устанавливаю текст ошибки, добавляю класс, который делает тег с текстом ошибки видимым
  errorPlace.textContent = input.validationMessage;
  errorPlace.classList.add(errorClass);
};

/**
 * функция скрывает текст ошибки валидации поля
 * @param {object} errorPlace тег, который нужно скрыть
 * @param {string} errorClass селектор класса
 */
function hideInputError(errorPlace, errorClass) {
  //удаляю контент, удаляю класс
  errorPlace.textContent = '';
  errorPlace.classList.remove(errorClass);
};

/**
 * функция поиска места (тега span), в котором выводится ошибка
 * @param {object} input поле ввода, которое проверяется на валидность
 * @returns {object} возвращается тег (span), в котором выводится ошибка валидности для поля input
 */
function findErrorPlace(input) {
  //нахожу атрибут name у инпута
  const inputName = input.getAttribute('name');

  //нахожу тег, в котором будет показана ошибка. Класс тега содержит в себе [name] валидируемого поля
  const errorPlace = document.querySelector(`.${inputName}-error`);

  // возвращаю тег места где будет показана ошибка
  return errorPlace;
};

/**
 * функция проверки поля на валидность
 * @param {object} input проверяемое поле
 * @param {string} errorClass селектор ошибки
 */
function checkInputValidity(input, errorClass) {
  if(input.validity.valid) {
    //если поле валидно, скрываю ошибку:
    //нахожу место вывода ошибки, которую нужно скрыть. Место ищет функция findErrorPlace и возвращает нужный тег
     const errorPlace = findErrorPlace(input);

     //вызываю функцию, которая скрывает ошибку
     hideInputError(errorPlace, errorClass);
  }
  else {
    //если поле не валидно, показываю ошибку:
    //нахожу место вывода ошибки, которую нужно показать. Место ищет ф-ция findErrorPlace и возвращает нужный тег
    const errorPlace = findErrorPlace(input);

    //вызываю функцию, которая показывает ошибку
    showInputError(errorPlace, input, errorClass);
  }
};

/**
 * функция проверки на наличие невалидного поля в форме
 * @param {Array} inputList массив всех валидируемых полей в форме
 * @returns {boolean} возвращает true если есть хоть одно невалидное поле , иначе - false
 */
function hasInvalidInput(inputList) {
  return inputList.some(input => {
    //проверяю наличие хотя бы одного невалидного поля в массиве инпутов одной формы
    // console.log(input.validity.valid);
    return !input.validity.valid;
  });
};

/**
 * функция делает кнопку сабмит неактивной
 * @param {object} buttonElement тег кнопки сибмит
 * @param {string} inactiveButtonClass селектор класса
 */
function disableButtonState(buttonElement, inactiveButtonClass) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
};

/**
 * функция делает кнопку сабмит активной
 * @param {object} buttonElement тег кнопки сибмит
 * @param {string} inactiveButtonClass селектор класса 
 */
function activateBUttonState(buttonElement, inactiveButtonClass) {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}

/**
 * функция переключения состояния доступности кнопки сабмит в зависимости от наличия невалидных полей в форме
 * @param {Array} inputList массив всех валидируемых полей в форме
 * @param {object} buttonElement тег кнопки сибмит
 * @param {string} inactiveButtonClass селектор класса
 */
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if(hasInvalidInput(inputList, inactiveButtonClass)) {
    //если в форме есть невалидное поле,
    // делаю кнопку неактивной - вызываю для этого функцию disableButtonState
    disableButtonState(buttonElement, inactiveButtonClass);
  }
  else {
    //иначе делаю кнопку активной - вызываю для этого функцию activateBUttonState
    activateBUttonState(buttonElement, inactiveButtonClass);
  }
};

/**
 * функция включения валидации
 * @param {object} объект с настройками
 */
function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
  //нахожу все формы
  const formList = Array.from(document.querySelectorAll(formSelector));

  //прохожусь по каждой форме и выполняю для каждой формы необходимые действия
  formList.forEach(form => {
    //отменяю стандартное поведение формы при сабмите
    form.addEventListener('submit', evt => evt.preventDefault());

    //нахожу все инпуты в текущей форме
    const inputList = Array.from(form.querySelectorAll(inputSelector));

    //нахожу в текущей форме кнопку с функцией submit
    const buttonElement = form.querySelector(submitButtonSelector);

    //вызываю функцию toggleButtonState, которая управляет состоянием кнопки сабмит
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);

    //прохожусь по инпутам, навешиваю слушателя ошибок по событию ввода символа
    inputList.forEach(input => {
      input.addEventListener('input', evt => {
        //вызываю функцию checkInputValidity, которая проверяет валидность поля
        checkInputValidity(input, errorClass);

        //вызываю функцию toggleButtonState, которая управляет состоянием кнопки сабмит
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      })
    });
  });
};

//включаю валидацию, в качестве параметра - объект с настройками
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});