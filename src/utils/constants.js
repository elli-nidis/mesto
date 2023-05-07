//объект с селекторами
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  errorField: '.popup__error',
};

//объект с настройками api
const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  token: 'a5c45cd6-8652-4e04-a6db-ae4adf79f1fa',
}

export {validationConfig, apiConfig};