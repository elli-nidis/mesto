//нахожу кнопки редактирования профиля и закрытия попапа
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');

//нахожу попап
const userEditPopup = document.querySelector('.popup');

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
function openUserEditPopup() {
  userEditPopup.classList.add('popup_opened');

//заполняю значения юзера в попапе - тяну из профиля
  popupUserName.value = profileUserName.textContent;
  popupUserOccupation.value = profileUserOccupation.textContent;
}

/**
 * функция закрытия попапа
 */
function closeUserEditPopup() {
  userEditPopup.classList.remove('popup_opened');
}

/**
 * функция редактирования профиля через попап
 * записывает в профиль новые значения пользователя, введённые в форму редактирования (папап)
 */
function handlePopupFormSubmit (event) {
  //отменяю стандартную отправку формы
  event.preventDefault();

//присваиваю новые значения в профиле, тяну из попапа
  profileUserName.textContent = popupUserName.value;
  profileUserOccupation.textContent = popupUserOccupation.value;

//закрываю попап
  closeUserEditPopup();
}

//добавляю слушателя на кнопку редактирования профиля (открывает попап)
profileEditButton.addEventListener('click', openUserEditPopup);

//добавляю слушателя на кнопку закрытия попапа
popupCloseButton.addEventListener('click', closeUserEditPopup);

//Добавляю слушателя на кнопку Сохранить в попапе
popupForm.addEventListener('submit', handlePopupFormSubmit);



