import {apiConfig, validationConfig} from '../utils/constants.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';
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

//получаю карточки и пользователя от сервера
Promise.all([api.getUser(), api.getInitialCards()])
.then(([userData, cards]) => {
  userInfo.setUserProfile(userData);
  userInfo.setAvatar(userData);
  section.renderItems(cards);
})
.catch((err) => {console.log(err)});

/**
* функция создания карточки
*/
function createCard(data) {
  const card = new Card(data, templateCard, handleCardClick, handleLikeClick, handleDeleteLikeClick, userInfo.userId, handleDeleteCard);
  const cardElement = card.createCard();
  return cardElement
};

/**
* функция отрисовки карточки на странице
*/
function renderCard(data) {
  const cardElement = createCard(data);
  section.addItem(cardElement);
};

//создаю экземпляр класса Section
const section = new Section({
  renderer: renderCard,
  }, '.photo-grid'
);

//создаю экземпляр класса UserInfo (попап профиля)
const userInfo = new UserInfo({
  userNameSelector: '.profile__user-name',
  userOccupationSelector: '.profile__user-occupation',
  userAvatarSelector: '.profile__avatar'
});

//создаю экземпляр класса PopupWithImage
const photoZoomPopup = new PopupWithImage('.popup_type_photo-zoom');
photoZoomPopup.setEventListeners();

//создаю экземпляр класса PopupWithForm для попапа добавления карточки
const photoAddPopup = new PopupWithForm({
  popupSelector: '.popup_type_add-photo',
  handleFormSubmit: (data) => {
    photoAddPopup.renderLoading(true);
    api.postNewCard(data)
    .then(res => {
      section.addNewItem(createCard(res));
      photoAddPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      photoAddPopup.renderLoading(false);
    });
  }
});
photoAddPopup.setEventListeners();  

//создаю экземпляр класса PopupWithForm для попапа профиля
const userEditPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (data) => {
    userEditPopup.renderLoading(true);
    api.patchUser(data)
    .then(res => {
      userInfo.setUserProfile(res);
      userEditPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      userEditPopup.renderLoading(false);
    });
  }
});
userEditPopup.setEventListeners();  

//создаю экземпляр класса PopupWithForm для попапа редактирования аватара
const avatarUpdatePopup = new PopupWithForm({
  popupSelector: '.popup_type_update-avatar',
  handleFormSubmit: (data) => {
    avatarUpdatePopup.renderLoading(true);
    api.patchAvatar(data)
    .then(res => {
      userInfo.setAvatar(res);
      avatarUpdatePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarUpdatePopup.renderLoading(false);
    });
  }
});
avatarUpdatePopup.setEventListeners();

//создаю экземпляр класса PopupWithSubmit для попапа удаления карточки
const cardDeletePopup = new PopupWithSubmit({popupSelector: '.popup_type_delete-photo'});
cardDeletePopup.setEventListeners();

/**
* функция обработки клика на корзину
*/
function handleDeleteCard(card) { 
  //определяю поведение при "сабмите"
  const handleSubmit = () => {
    api.deleteCard(card.idCard)
    .then(res => {
      card.deleteCard();
      cardDeletePopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
  };

  cardDeletePopup.setSubmitAction(handleSubmit);
  cardDeletePopup.open();
};

/**
* функция обработки клика по карточке
*/
function handleCardClick(link, name) {
  photoZoomPopup.open(link, name);
};

/**
* функция обработки клика по лайку (поставить лайк)
*/
function handleLikeClick(data) {
  const newCardData =  api.putLike(data).catch((err) => {console.log(err)});
  return newCardData;
};

/**
* функция обработки клика по лайку (удалить лайк)
*/
function handleDeleteLikeClick(data) {
  const newCardData =  api.deleteLike(data).catch((err) => {console.log(err)});
  return newCardData;
};

//добавляю слушателей на кнопки открытия попапов
profileEditButton.addEventListener('click', () => {
  userEditPopup.setInputValues(userInfo.getUserInfo());
  userEditPopup.open();
  //вызываю функцию очистки формы от ошибок валидации
  userEditPopupFormValidator.resetValidation();
});

profileAddButton.addEventListener('click', () => {
  photoAddPopup.open();
  photoAddPopupFormValidator.resetValidation();
});

avatarEditButton.addEventListener('click', () => {
  avatarUpdatePopup.open();
  avatarUpdatePopupFormValidator.resetValidation();
});

})();