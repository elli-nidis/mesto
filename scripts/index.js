import {Card} from './Card.js';

(function() {
  
//нахожу кнопки, открывающие попапы
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

//нахожу попапы
const userEditPopup = document.querySelector('.popup_type_edit-profile');
const photoAddPopup = document.querySelector('.popup_type_add-photo');
const photoZoomPopup = document.querySelector('.popup_type_photo-zoom');

//нахожу кнопки, закрывающие попапы
const userEditPopupCloseButton = userEditPopup.querySelector('.close-button');
const photoAddPopupCloseButton = photoAddPopup.querySelector('.close-button');
const photoZoomPopupCloseButton = photoZoomPopup.querySelector('.close-button');

//нахожу поля для записи данных юзера в профиле и в попапе редактирования профиля
const profileUserName = document.querySelector('.profile__user-name');
const profileUserOccupation = document.querySelector('.profile__user-occupation');
const inputUserName = userEditPopup.querySelector('.popup__input_type_user-name');
const inputUserOccupation = userEditPopup.querySelector('.popup__input_type_user-occupation');

//нахожу поля в попапе добавления карточки
const inputPhotoName = document.querySelector('.popup__input_type_photo-name');
const inputPhotLink = document.querySelector('.popup__input_type_photo-link');

//нахожу формы
const profileForm = document.querySelector('[name="edit-popup"]');
const photoForm = document.querySelector('[name="add-popup"]');

//нахожу элементы модального окна просмотра фотографии
const photoZoomImg = photoZoomPopup.querySelector('.photo__img');
const photoZoomTitle = photoZoomPopup.querySelector('.photo__title');

// устанавливаю шаблон для карточки
const templateCard = document.querySelector('.template-card').content;

//нахожу место, где будут отрисовываться карточки
const photoGrid = document.querySelector('.photo-grid');

/**
* функция отрисовки новой (добавленной вручную) карточки на странице
*/
function addCard(data) {

  const card = new Card(data, templateCard, openPopup);

  photoGrid.prepend(card.createCard());
};


//отрисовываю карточки при загрузке страницы
initialCards.forEach((data) => {
  const card = new Card(data, templateCard, openPopup);
  photoGrid.append(card.createCard());
});

/**
 * функция нахождения открытого попапа. Возвращает его тег
 */
function findPopupToClose() {
  const popup = document.querySelector('.popup_opened');
  return popup;
}

/**
 * функция проверки нажатия клавиши esc
 */
function checkEscapeButtonClick(evt) {
  if (evt.key === 'Escape') {
    //если нажата клавиша esc, то нахожу открытый попап через функцию findPopupToClose
    const popup = findPopupToClose();

    //закрываю открытый попап
    closePopup(popup);
  }
};

/**
 * функция проверки клика по оверлею
 */
function checkOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    //если произошёл клик на оверлей, нахожу открытый попап через функцию findPopupToClose
    const popup = findPopupToClose();

    //закрываю открытый попап
    closePopup(popup);
  }
};

/**
 * функция добавления слушателя на клавишу esc
 */
function setEventListenerWindow() {
  document.addEventListener('keydown', checkEscapeButtonClick);
};

/**
 * функция добавления слушателя на overlay
 */
function setEventListenerOverlay(popup) {
  popup.addEventListener('click', checkOverlayClick);
};

/**
 * функция удаления слушателя с клавиши esc
 */
function removeEventListenerWindow() {
  document.removeEventListener('keydown', checkEscapeButtonClick);
};

/**
 * функция удаления слушателя с overlay
 */
function removeEventListenerOverlay(popup) {
  popup.removeEventListener('click', checkOverlayClick);
};

/**
 * функция очистки полей формы попапа добавления фото
 */
function checkOpenedAddPhotoPopup(popup) {
  console.log('работает функция checkOpenedAddPhotoPopup');
  photoForm.reset();
};

/**
 * функция открытия попапа
 */
function openPopup (popup) {
  popup.classList.add('popup_opened');

  //вызываю функцию добавления слушателя на клавишу esc
  setEventListenerWindow();

  //вызываю функцию добавления слушателя на оверлей
  setEventListenerOverlay(popup);
};

/**
 * функция закрытия попапа
 */
function closePopup(popup) {
  popup.classList.remove('popup_opened');

  //удаляю слушателя клавиши esc
  removeEventListenerWindow();

  //удаляю слушателя с оверлея
  removeEventListenerOverlay(popup);
};

/**
 * обработчик попапа редактирования профиля
 * заполняет значения в инпутах формы и вызывает функцию
 * открытия попапа
 */
function openEditProfilePopup() {
  //заполняю значения юзера в попапе profile - тяну из профиля
  inputUserName.value = profileUserName.textContent;
  inputUserOccupation.value = profileUserOccupation.textContent;

  //вызываю функцию открытия попапа
  openPopup(userEditPopup);
}

/**
 * функция редактирования профиля через попап
 * записывает в профиль новые значения пользователя, введённые в форму редактирования (папап)
 */
function handleEditProfileForm (event) {
  //отменяю стандартную отправку формы
  event.preventDefault();

//присваиваю новые значения в профиле, тяну из попапа
  profileUserName.textContent = inputUserName.value;
  profileUserOccupation.textContent = inputUserOccupation.value;

//закрываю попап
  closePopup(userEditPopup);
};

/**
 * функция добавления картинки через попап
 * добавляет новую картинку на страницу
 */
function handleAddPhotoForm (event) {
  //отменяю стандартную отправку формы
  event.preventDefault();

  //создаю и заполняю объект, который содержит данные для карточки
  const newPhotoName = inputPhotoName.value;
  const newPhotLink = inputPhotLink.value;
  const newCard = {
    name: newPhotoName,
    link: newPhotLink
  };

  //закрываю попап
  closePopup(photoAddPopup);
  
  //очищаю инпуты формы
  checkOpenedAddPhotoPopup(photoAddPopup);

  //отрисовываю на странице новую карточку
  addCard(newCard);
};


//добавляю слушателей на кнопки открытия попапов
profileEditButton.addEventListener('click', openEditProfilePopup);
profileAddButton.addEventListener('click', () => {openPopup(photoAddPopup)});

//добавляю слушателей на кнопки закрытия попапов
userEditPopupCloseButton.addEventListener('click', () => {closePopup(userEditPopup)});
photoAddPopupCloseButton.addEventListener('click', () => {closePopup(photoAddPopup)});
photoZoomPopupCloseButton.addEventListener('click', () => {closePopup(photoZoomPopup)});

//добавляю слушателя на кнопку Сохранить в попапе user-edit pop-up
profileForm.addEventListener('submit', handleEditProfileForm);

//добавляю слушателя на кнопку Добавить в попапе add-photo pop-up
photoForm.addEventListener('submit', handleAddPhotoForm);

})();