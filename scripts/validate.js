/**
 * функция включения валидации
 */
function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
  
  //нахожу все формы
  const forms = Array.from(document.querySelectorAll(formSelector));

  //отменяю стандартное поведение всех форм при сабмите
  forms.forEach(form => {
    form.addEventListener('submit', evt => evt.preventDefault());

    //нахожу все инпуты
    const inputs = Array.from(form.querySelectorAll(inputSelector));

    //прохожусь по инпутам, навешиваю слушатель ошибок по событию ввода символа
    inputs.forEach(input => {
      input.addEventListener('input', evt => {
        //если поле валидно, скрыть спан с текстом ошибки, если не валидно - показать спан с текстом ошибки
        if(input.validity.valid) {
          //скрыть ошибку
        }
        else {
          //показать ошибку
        }
      })
    })

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

