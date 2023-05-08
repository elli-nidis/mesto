import {apiConfig, validationConfig} from '../utils/constants.js';
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
const avatarEditButton = document.querySelector('.profile__edit-avatar');

//нахожу данные пользователя
const profileImg = document.querySelector('.profile__avatar');
const profileUserName = document.querySelector('.profile__user-name');
const profileUserOccupation = document.querySelector('.profile__user-occupation');

// устанавливаю шаблон для карточки
const templateCard = document.querySelector('.template-card').content;

//создаю экземпляры классов валидации для каждой формы
const userEditPopupFormValidator = new FormValidator(validationConfig, '[name="edit-popup"]');
const photoAddPopupFormValidator = new FormValidator(validationConfig, '[name="add-popup"]');
const avatarUpdatePopupFormValidator = new FormValidator(validationConfig, '[name="update-avatar"]');

//нахожу поля формы попапа редактирования профиля
const userName = document.querySelector('.popup__input_type_user-name');
const userOccupation = document.querySelector('.popup__input_type_user-occupation');

let userId = undefined;

//запускаю валидацию для каждой формы
userEditPopupFormValidator.enableValidation();
photoAddPopupFormValidator.enableValidation();
avatarUpdatePopupFormValidator.enableValidation();



//создаю экземпляр класса Api
const api = new Api({
  baseUrl: apiConfig.baseUrl,
  headers: {
    authorization: apiConfig.token,
    'Content-Type': 'application/json'
  }
}); 


async function getUserId() {
  const user = await api.getUser().then(data => {return data});
   return user;
}

/**
* функция устанавливает данные пользователя при загрузке страницы
*/
function renderUser(){
  api.getUser()
    .then(data => {
      profileImg.src = data.avatar;
      profileUserName.textContent = data.name;
      profileUserOccupation.textContent = data.about;
      userId = data._id;
  })
}

//устанавливаю данные профиля, полученные с сервера
renderUser();


/**
* функция создания карточки
*/
function createCard(data) {
  const card = new Card(data, templateCard, handleCardClick, handleLikeClick, handleDeleteLikeClick, userId);
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


//создаю экземпляр класса Section
const section = new Section({
  // items: initialCards,
  items: api.getInitialCards(),
  renderer: renderCard,
}, '.photo-grid'
);

//отрисовываю карточки при загрузке страницы
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
  handleFormSubmit: async (data) => {
    const newCard =  await api.postNewCard(data);
    section.addNewItem(createCard(newCard));
    photoAddPopup.close()}});

//создаю экземпляр класса PopupWithForm для попапа профиля
const userEditPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (data) => {
    //userInfo.setUserInfo(data);
    api.patchUser(data);
    renderUser();
    userEditPopup.close()}});

//создаю экземпляр класса PopupWithForm для попапа редактирования аватара
const avatarUpdatePopup = new PopupWithForm({
  popupSelector: '.popup_type_update-avatar',
  handleFormSubmit: async (data) => {
    await api.patchAvatar(data);
    renderUser();
    avatarUpdatePopup.close()}});

/**
* функция обработки клика по карточке
*/
function handleCardClick(link, name) {
  //вызываю метод open класса PopupWithImage (открываю попап)
  photoZoomPopup.open(link, name);
};

/**
* функция обработки клика по лайку (поставить лайк)
*/
async function handleLikeClick(data) {
  const newCardData =  await api.putLike(data);
  return newCardData;
};

/**
* функция обработки клика по лайку (удалить лайк)
*/
async function handleDeleteLikeClick(data) {
  const newCardData =  await api.deleteLike(data);
  return newCardData;
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

avatarEditButton.addEventListener('click', () => {
  avatarUpdatePopup.open();
  avatarUpdatePopupFormValidator.resetValidation();
});

})();