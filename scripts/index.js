// //нахожу кнопки редактирования профиля и закрытия попапа
// const profileEditButton = document.querySelector('.profile__edit-button');
// const popupCloseButton = document.querySelector('.popup__close-button');


// //нахожу попап редактирования профиля
// const userEditPopup = document.querySelector('.popup_type_edit-profile');

// //нахожу поля для записи данных юзера в профиле и в попапе
// const profileUserName = document.querySelector('.profile__user-name');
// const profileUserOccupation = document.querySelector('.profile__user-occupation');
// const popupUserName = document.querySelector('.popup__input_user_name');
// const popupUserOccupation = document.querySelector('.popup__input_user_occupation');

// //нахожу форму
// const popupForm = document.querySelector('.popup__form');


// /**
//  * функция открытия попапа
//  */
// function openUserEditPopup() {
//   userEditPopup.classList.add('popup_opened');

// //заполняю значения юзера в попапе - тяну из профиля
//   popupUserName.value = profileUserName.textContent;
//   popupUserOccupation.value = profileUserOccupation.textContent;
// }

// /**
//  * функция закрытия попапа
//  */
// function closeUserEditPopup() {
//   userEditPopup.classList.remove('popup_opened');
// }

// /**
//  * функция редактирования профиля через попап
//  * записывает в профиль новые значения пользователя, введённые в форму редактирования (папап)
//  */
// function handlePopupFormSubmit (event) {
//   //отменяю стандартную отправку формы
//   event.preventDefault();

// //присваиваю новые значения в профиле, тяну из попапа
//   profileUserName.textContent = popupUserName.value;
//   profileUserOccupation.textContent = popupUserOccupation.value;

// //закрываю попап
//   closeUserEditPopup();
// }

// //добавляю слушателя на кнопку редактирования профиля (открывает попап)
// profileEditButton.addEventListener('click', openUserEditPopup);

// //добавляю слушателя на кнопку закрытия попапа
// popupCloseButton.addEventListener('click', closeUserEditPopup);

// //Добавляю слушателя на кнопку Сохранить в попапе
// popupForm.addEventListener('submit', handlePopupFormSubmit);

//*****************************************************************

//массив карточек, доступных при загрузке страницы
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

// устанавливаю шаблон для карточки
const templateCard = document.querySelector('.template-card').content;

//нахожу место, где будут отрисовываться карточки
const photoGrid = document.querySelector('.photo-grid');


//отрисовываю карточки
initialCards.forEach((item, index, arr) => {
  //клонирую элемент (карточку)
  const cardElement = templateCard.querySelector('.card').cloneNode(true);

  //наполняю содержимым
  cardElement.querySelector('.card__img').src = arr[index].link;
  cardElement.querySelector('.card__img').alt = arr[index].name;
  cardElement.querySelector('.card__title').textContent = arr[index].name;
  
  //отображаю на странице
  photoGrid.append(cardElement);
});

//нахожу кнопки, открывающие попапы
const openButtons = document.querySelectorAll('.open-button');

//нахожу кнопки, закрывающие попапы (крестики)
const closeButtons = document.querySelectorAll('.close-button');





//нахожу попап редактирования профиля
const userEditPopup = document.querySelector('.popup_type_edit-profile');
const photoAdd = document.querySelector('.popup_type_add-photo');
const photoZoom = document.querySelector('.popup_type_photo-zoom');


//нахожу поля для записи данных юзера в профиле и в попапе
const profileUserName = document.querySelector('.profile__user-name');
const profileUserOccupation = document.querySelector('.profile__user-occupation');
const popupUserName = document.querySelector('.popup__input_user_name');
const popupUserOccupation = document.querySelector('.popup__input_user_occupation');

//нахожу форму
const popupForm = document.querySelector('.popup__form');


/**
 * функция открытия попапа
 */
function openPopup(event) {
  if (event.target.classList.contains('profile__edit-button')) {
  userEditPopup.classList.add('popup_opened');

//заполняю значения юзера в попапе - тяну из профиля
  popupUserName.value = profileUserName.textContent;
  popupUserOccupation.value = profileUserOccupation.textContent;
  }
  else if (event.target.classList.contains('profile__add-button')) {
    photoAdd.classList.add('popup_opened');
  }

  else if (event.target.classList.contains('card__img')) {
    photoZoom.classList.add('popup_opened');
  }

}

/**
 * функция закрытия попапа
 */
function closePopup(event) {
  const popupClose = event.target.closest('.popup');
  console.log(popupClose);
  popupClose.classList.remove('popup_opened');
}

/**
 * функция редактирования профиля через попап
 * записывает в профиль новые значения пользователя, введённые в форму редактирования (папап)
 */
// function handlePopupFormSubmit (event) {
//   //отменяю стандартную отправку формы
//   event.preventDefault();

// //присваиваю новые значения в профиле, тяну из попапа
//   profileUserName.textContent = popupUserName.value;
//   profileUserOccupation.textContent = popupUserOccupation.value;

// //закрываю попап
//   closeUserEditPopup();
// }

//добавляю слушателей на кнопки открытия попапов
openButtons.forEach((item) => item.addEventListener('click', openPopup));

//добавляю слушателей на кнопки закрытия попапов
closeButtons.forEach((item) => item.addEventListener('click', closePopup));

// //Добавляю слушателя на кнопку Сохранить в попапе
// popupForm.addEventListener('submit', handlePopupFormSubmit);
