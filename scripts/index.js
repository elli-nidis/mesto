import {initialCards, validationConfig} from './constants.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {Section} from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

(function() {
  
//нахожу кнопки, открывающие попапы
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

// устанавливаю шаблон для карточки
const templateCard = document.querySelector('.template-card').content;

//создаю экземпляры классов валидации для каждой формы
const userEditPopupFormValidator = new FormValidator(validationConfig, '[name="edit-popup"]');
const photoAddPopupFormValidator = new FormValidator(validationConfig, '[name="add-popup"]');

//запускаю валидацию для каждой формы
userEditPopupFormValidator.enableValidation();
photoAddPopupFormValidator.enableValidation();

/**
* функция создания карточки
*/
function createCard(data) {
  const card = new Card(data, templateCard, handleCardClick);
  const cardElement = card.createCard();
  console.log(cardElement);
  return cardElement
}

/**
* функция отрисовки карточки на странице
*/
function renderCard(cardData) {
  const cardElement = createCard(cardData)
  section.addItem(cardElement);
}

//отрисовываю карточки при загрузке страницы
const section = new Section({
  items: initialCards,
  renderer: renderCard,
}, '.photo-grid'
);

section.renderItems();

//создаю экземпляр класса UserInfo (попап профиля)
const userInfo = new UserInfo({
  userNameSelector: '.profile__user-name',
  userOccupationSelector: '.profile__user-occupation'
});

//создаю экземпляр класса PopupWithImage
const photoZoomPopup = new PopupWithImage('.popup_type_photo-zoom');

//создаю экземпляр класса PopupWithForm для попапа добавления карточки
const photoAddPopup = new PopupWithForm({
  popupSelector: '.popup_type_add-photo',
  handleFormSubmit: (data) => {
    section.addNewItem(createCard(data));
    photoAddPopup.close()}});

//создаю экземпляр класса PopupWithForm для попапа профиля
const userEditPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    userEditPopup.close()}});

/**
* функция обработки клика по карточке
*/
function handleCardClick(link, name) {
  //вызываю метод open класса PopupWithImage (открываю попап)
  photoZoomPopup.open(link, name);
};


//добавляю слушателей на кнопки открытия попапов
profileEditButton.addEventListener('click', () => {
  userEditPopup.open();
  //вызываю функцию очистки формы от ошибок валидации
  userEditPopupFormValidator.resetValidation();
});

profileAddButton.addEventListener('click', () => {
  photoAddPopup.open();
  //вызываю функцию очистки формы от ошибок валидации
  photoAddPopupFormValidator.resetValidation();
});

})();