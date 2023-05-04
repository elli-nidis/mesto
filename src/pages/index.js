import {apiConfig, initialCards, validationConfig} from '../utils/constants.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import './index.css';

(function() {
  
//нахожу кнопки, открывающие попапы
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

// устанавливаю шаблон для карточки
const templateCard = document.querySelector('.template-card').content;

//создаю экземпляры классов валидации для каждой формы
const userEditPopupFormValidator = new FormValidator(validationConfig, '[name="edit-popup"]');
const photoAddPopupFormValidator = new FormValidator(validationConfig, '[name="add-popup"]');

//нахожу поля формы попапа редактирования профиля
const userName = document.querySelector('.popup__input_type_user-name');
const userOccupation = document.querySelector('.popup__input_type_user-occupation');

//запускаю валидацию для каждой формы
userEditPopupFormValidator.enableValidation();
photoAddPopupFormValidator.enableValidation();

/**
* функция создания карточки
*/
function createCard(data) {
  const card = new Card(data, templateCard, handleCardClick);
  const cardElement = card.createCard();
  return cardElement
}

/**
* функция отрисовки карточки на странице
*/
function renderCard(cardData) {
  const cardElement = createCard(cardData)
  section.addItem(cardElement);
}


//******* создаю экземпляр класса Api *****
const api = new Api({
  baseUrl: `${apiConfig.baseUrl}/cards`,
  headers: {
    authorization: apiConfig.token,
    'Content-Type': 'application/json'
  }
}); 

//отрисовываю карточки при загрузке страницы
const section = new Section({
  // items: initialCards,
  items: api.getInitialCards(),
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

/**
* функция установки данных юзера в попапе редактирования профиля при открытии
*/
function setUserData() {
  //беру данные из метода getUserInfo() класса UserInfo
  const userData = userInfo.getUserInfo();
  userName.value = userData.userName;
  userOccupation.value = userData.userOccupation;
};



//добавляю слушателей на кнопки открытия попапов
profileEditButton.addEventListener('click', () => {
  //устанавливаю данные
  setUserData();

  //открываю попап
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