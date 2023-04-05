
// const validationConfig = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible',
//   popupError: '.popup__error'
// };

// /**
//  * функция показывает текст ошибки валидации поля
//  * @param {object} errorPlace тег, который нужно показать
//  * @param {object} input поле, для которого показывается текст ошибки
//  * @param {string} errorClass селектор класса
//  */
// function showInputError(errorPlace, input, errorClass) {
//   //устанавливаю текст ошибки, добавляю класс, который делает тег с текстом ошибки видимым
//   errorPlace.textContent = input.validationMessage;
//   errorPlace.classList.add(errorClass);
// };

// /**
//  * функция скрывает текст ошибки валидации поля
//  * @param {object} errorPlace тег, который нужно скрыть
//  * @param {string} errorClass селектор класса
//  */
// function hideInputError(errorPlace, errorClass) {
//   //удаляю контент, удаляю класс
//   errorPlace.textContent = '';
//   errorPlace.classList.remove(errorClass);
// };

// /**
//  * функция поиска места (тега), в котором выводится ошибка
//  * @param {object} input поле ввода, которое проверяется на валидность
//  * @returns {object} возвращает тег, в котором выводится ошибка валидности для поля input
//  */
// function findErrorPlace(input) {
//   //нахожу атрибут name у инпута
//   const inputName = input.getAttribute('name');

//   //нахожу тег, в котором будет показана ошибка. Класс искомого тега содержит в себе [name] валидируемого поля
//   const errorPlace = document.querySelector(`.${inputName}-error`);

//   // возвращаю тег, в котором будет выведен текст ошибки
//   return errorPlace;
// };

// /**
//  * функция убирает слили для невалидного поля
//  * @param {*} input поле ввода, которое проверяется на валидность
//  * @param {*} inputErrorClass класс модификатора, устанавливающий стиль невалидного поля
//  */
// function removeStyleErrorInput(input, inputErrorClass) {
//   input.classList.remove(inputErrorClass);
// };

// /**
//  * функция устанавливает слили для невалидного поля
//  * @param {*} input поле ввода, которое проверяется на валидность
//  * @param {*} inputErrorClass класс модификатора, устанавливающий стиль невалидного поля
//  */
// function setStyleErrorInput(input, inputErrorClass) {
//   input.classList.add(inputErrorClass);
// };

// /**
//  * функция проверки поля на валидность
//  * @param {object} input проверяемое поле
//  * @param {string} errorClass селектор ошибки
//  */
// function checkInputValidity(input, errorClass, inputErrorClass) {
//   if(input.validity.valid) {
//     //если поле валидно, скрываю ошибку:
//     //нахожу место вывода ошибки, которую нужно скрыть. Место ищет функция findErrorPlace и возвращает нужный тег
//      const errorPlace = findErrorPlace(input);

//     //вызываю функцию, изменяющую стиль инпута
//     removeStyleErrorInput(input, inputErrorClass);

//      //вызываю функцию, которая скрывает ошибку
//      hideInputError(errorPlace, errorClass);
//   }
//   else {
//     //если поле не валидно, показываю ошибку:
//     //нахожу место вывода ошибки, которую нужно показать. Место ищет ф-ция findErrorPlace и возвращает нужный тег
//     const errorPlace = findErrorPlace(input);

//     //вызываю функцию, изменяющую стиль инпута
//     setStyleErrorInput(input, inputErrorClass);

//     //вызываю функцию, которая показывает ошибку
//     showInputError(errorPlace, input, errorClass);
//   }
// };

// /**
//  * функция проверки наличия невалидного поля в форме
//  * @param {Array} inputList массив всех валидируемых полей в форме
//  * @returns {boolean} возвращает true если есть хоть одно невалидное поле , иначе - false
//  */
// function hasInvalidInput(inputList) {
//   return inputList.some(input => {
//     //проверяю наличие хотя бы одного невалидного поля в массиве инпутов одной формы
//     return !input.validity.valid;
//   });
// };

// /**
//  * функция деактивации кнопки сабмит
//  * @param {object} buttonElement тег кнопки сибмит
//  * @param {string} inactiveButtonClass селектор класса
//  */
// function disableButtonState(buttonElement, inactiveButtonClass) {
//   //добавляю класс модификатора, устанавливаю деактивирующий кнопку атрибут
//   buttonElement.classList.add(inactiveButtonClass);
//   buttonElement.setAttribute('disabled', true);
// };

// /**
//  * функция активации кнопки сабмит
//  * @param {object} buttonElement тег кнопки сибмит
//  * @param {string} inactiveButtonClass селектор класса 
//  */
// function activateButtonState(buttonElement, inactiveButtonClass) {
//   //удаляю класс модификатора, удаляю атрибут, деактивирующий кнопку
//   buttonElement.classList.remove(inactiveButtonClass);
//   buttonElement.removeAttribute('disabled');
// }

// /**
//  * функция переключения состояния доступности кнопки сабмит в зависимости от наличия невалидных полей в форме
//  * @param {Array} inputList массив всех валидируемых полей в форме
//  * @param {object} buttonElement тег кнопки сибмит
//  * @param {string} inactiveButtonClass селектор класса
//  */
// function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
//   if(hasInvalidInput(inputList, inactiveButtonClass)) {
//     //если в форме есть невалидное поле,
//     // делаю кнопку неактивной - вызываю для этого функцию disableButtonState
//     disableButtonState(buttonElement, inactiveButtonClass);
//   }
//   else {
//     //иначе делаю кнопку активной - вызываю для этого функцию activateBUttonState
//     activateButtonState(buttonElement, inactiveButtonClass);
//   }
// };

// /**
//  * функция включения валидации
//  * @param {object} объект с настройками
//  */
// function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
//   //нахожу все формы
//   const formList = Array.from(document.querySelectorAll(formSelector));

//   //прохожусь по каждой форме и выполняю для каждой формы необходимые действия
//   formList.forEach(form => {
//     //отменяю стандартное поведение формы при сабмите
//     form.addEventListener('submit', evt => evt.preventDefault());

//     //нахожу все инпуты в текущей форме
//     const inputList = Array.from(form.querySelectorAll(inputSelector));

//     //нахожу в текущей форме кнопку с функцией submit
//     const buttonElement = form.querySelector(submitButtonSelector);

//     //вызываю функцию toggleButtonState, которая управляет состоянием кнопки сабмит
//     toggleButtonState(inputList, buttonElement, inactiveButtonClass);

//     //прохожусь по инпутам, навешиваю слушателя ошибок по событию ввода символа
//     inputList.forEach(input => {
//       input.addEventListener('input', evt => {
//         //вызываю функцию checkInputValidity, которая проверяет валидность поля
//         checkInputValidity(input, errorClass, inputErrorClass);

//         //вызываю функцию toggleButtonState, которая управляет состоянием кнопки сабмит
//         toggleButtonState(inputList, buttonElement, inactiveButtonClass);
//       })
//     });
//   });
// };

//включаю валидацию, в качестве параметра - объект с настройками
// enableValidation(validationConfig);

//нахожу блок profile, на который буду вешать слушателя в функции clearErrors
//слушатель отслеживает нажатие на кнопки открытия попапов профайла и добавления карточки
//после нажатия целевых кнопок, устанавливается нужный попап и происходит очистка ошибок
//и блокировка кнопки сабмит
const profile = document.querySelector('.profile');

/**
 * функция поиска попапа, который нужно очистить от ошибок
 */
function findPopupForCleaning(evt) {
  if(evt.target.classList.contains('profile__edit-button')) return userEditPopup;
  else if(evt.target.classList.contains('profile__add-button')) return photoAddPopup;
};

/**
* функция очистки целевого попапа от ошибок
*/
function clearErrors() {
  //вешаю слушателя на блок profile (использую делегирование чтобы добраться до кнопок открытия попапов)
  profile.addEventListener('click', (evt) => {
    //нахожу попап, который нужно очищать
    const popup = findPopupForCleaning(evt);

   //нахожу кнопку сабмит в попапе, поля инпут и поля с текстом ошибок, которые нужно очистить
    const buttonElement = popup.querySelector(validationConfig.submitButtonSelector);
    const inputElements = Array.from(popup.querySelectorAll(validationConfig.inputSelector));
    const errorElements = Array.from(popup.querySelectorAll(validationConfig.popupError));

    //вызываю функцию деактивации кнопки сабмит
    disableButtonState(buttonElement, validationConfig.inactiveButtonClass);

    //для каждого инпута вызываю функцию, которая убирает стили для невалидного поля
    inputElements.forEach((input) => removeStyleErrorInput(input, validationConfig.inputErrorClass));
    
    //для каждого поля с текстом ошибки вызываю функцию, которая скрывает это поле
    errorElements.forEach((error) => hideInputError(error, validationConfig.errorClass));
  });
};

//запускаю функцию очистки целевого попапа от ошибок
// clearErrors();