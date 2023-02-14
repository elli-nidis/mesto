// нахожу кнопки редактирования профиля и закрытия попапа
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
// нахожу попап
const userEditPopup = document.querySelector('.popup');
// присваиваю значения юзеру
const userName = 'Жак-Ив Кусто';
const userOccupation = 'Исследователь океана';
// нахожу поля для записи данных юзера в профиле и в попапе
const profileUserName = document.querySelector('.profile__user-name');
const profileUserOccupation = document.querySelector('.profile__user-occupation');
const popupUserName = document.querySelector('.popup__user-name');
const popupUserOccupation = document.querySelector('.popup__user-occupation');
// нахожу форму
const popupForm = document.querySelector('.popup__form');

// заполняю значения юзера в профиле
profileUserName.textContent = userName;
profileUserOccupation.textContent = userOccupation;

// заполняю значения юзера в попапе - тяну из профиля
popupUserName.value = profileUserName.textContent;
popupUserOccupation.value = profileUserOccupation.textContent;

// добавляю слушателей на кнопки редактирования профиля и закрытия попапа
profileEditButton.addEventListener('click', openUserEditPopup);
popupCloseButton.addEventListener('click', closeUserEditPopup);

popupForm.addEventListener('submit', handlePopupFormSubmit);

// функция открытия попапа
function openUserEditPopup() {
  userEditPopup.classList.add('popup_opened');
}

// функция закрытия попапа
function closeUserEditPopup() {
  userEditPopup.classList.remove('popup_opened');
}

// функция редактирования профиля через попап
function handlePopupFormSubmit (event) {
  // отменяю стандартную отправку формы
  event.preventDefault();
  // присваиваю новые значения в профиле, тяну из попапа
  profileUserName.textContent = popupUserName.value;
  profileUserOccupation.textContent = popupUserOccupation.value;
  // закрываю попап
  closeUserEditPopup();
}




