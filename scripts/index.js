//массив карточек, доступных при загрузке страницы
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Москва',
    link: 'https://images.unsplash.com/photo-1512495039889-52a3b799c9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80'
  },
  {
    name: 'Домбай',
    link: 'https://images.unsplash.com/photo-1556780183-f523058dc29b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1664&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'г. Калязин Тверская область',
    link: 'https://images.unsplash.com/photo-1644317296443-cab90204e5e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
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
function drawCards(arr) {
  arr.forEach((item, index, arr) => {
    //клонирую элемент (карточку)
    const cardElement = templateCard.querySelector('.card').cloneNode(true);
  
    //наполняю содержимым
    cardElement.querySelector('.card__img').src = arr[index].link;
    cardElement.querySelector('.card__img').alt = arr[index].name;
    cardElement.querySelector('.card__title').textContent = arr[index].name;
    
    //отображаю на странице
    photoGrid.prepend(cardElement);
  });
};
drawCards(initialCards);

//нахожу кнопки, открывающие попапы
const openButtons = document.querySelectorAll('.open-button');

//нахожу кнопки, закрывающие попапы
const closeButtons = document.querySelectorAll('.close-button');

//нахожу кнопки удаления картинок
const deleteButtons = document.querySelectorAll('.card__delete-button');

//нахожу кнопки лайков 🤍
const likeButtons = document.querySelectorAll('.card__like-button');

//нахожу попап редактирования профиля
const userEditPopup = document.querySelector('.popup_type_edit-profile');
const photoAddPopup = document.querySelector('.popup_type_add-photo');
const photoZoomPopup = document.querySelector('.popup_type_photo-zoom');

//нахожу поля для записи данных юзера в профиле и в попапе
const profileUserName = document.querySelector('.profile__user-name');
const profileUserOccupation = document.querySelector('.profile__user-occupation');
const popupUserName = document.querySelector('.popup__input_type_user-name');
const popupUserOccupation = document.querySelector('.popup__input_type_user-occupation');

const popupPhotoName = document.querySelector('.popup__input_type_photo-name');
const popupPhotLink = document.querySelector('.popup__input_type_photo-link');

//нахожу форму
const popupFormProfile = document.querySelector('[name="edit-popup"]');
console.log(popupFormProfile);
const popupFormPhoto = document.querySelector('[name="add-popup"]');


/**
 * функция открытия попапа
 */
function openPopup(event) {
  if (event.target.classList.contains('profile__edit-button')) {
  setTimeout(() => {
    userEditPopup.classList.add('popup_opened');
  }, 200);

//заполняю значения юзера в попапе - тяну из профиля
  popupUserName.value = profileUserName.textContent;
  popupUserOccupation.value = profileUserOccupation.textContent;
  }
  else if (event.target.classList.contains('profile__add-button')) {
    photoAddPopup.classList.add('popup_opened');
  }

  else if (event.target.classList.contains('card__img')) {
    photoZoomPopup.classList.add('popup_opened');
    photoZoomPopup.querySelector('.photo__img').src = event.target.src;
    photoZoomPopup.querySelector('.photo__img').alt = event.target.alt;
    photoZoomPopup.querySelector('.photo__title').textContent = event.target.alt;
  }

}

/**
 * функция закрытия попапа
 */
function closePopup(event) {
  const popupClose = event.target.closest('.popup');
  popupClose.classList.remove('popup_opened');
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
  closePopup(event);
}

/**
 * функция добавления картинки через попап
 * добавляет новую картинку на страницу
 */
function handleAddPhotoPopup (event) {
  const newElement = [];
  //отменяю стандартную отправку формы
  event.preventDefault();

  const newPhotoName = popupPhotoName.value;
  const newPhotLink = popupPhotLink.value;

  const newCard = {
    name: newPhotoName,
    link: newPhotLink
  }
  newElement.push(newCard);
  // initialCards.push(newCard);
  console.log(initialCards);

  //закрываю попап
  closePopup(event);
  //отрисовываю на странице новую карточку
  drawCards(newElement);
  //добавляю слушателя открытия попапа photo-zoom на новую карточку
  photoGrid.firstChild.querySelector('.open-button').addEventListener('click', openPopup);

  //добавляю слушателя удаления картинки на новую карточку
  photoGrid.firstChild.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  
  //добавляю слушателя лайка на новую карточку
  photoGrid.firstChild.querySelector('.card__like-button').addEventListener('click', likeCard);
};

/**
 * функция удаления картинки
 * удаляет картинку со страницы
 */
function deleteCard(event) {
  const cardForDelete = event.target.closest('.card');
  cardForDelete.remove();
};

/**
 * функция добавления/удаления лайка картинке
 */
function likeCard(event) {
  const activeLike = event.target;
  activeLike.classList.toggle('card__like-button_active');
};

//добавляю слушателей на кнопки открытия попапов
openButtons.forEach((item) => item.addEventListener('click', openPopup));

//добавляю слушателей на кнопки закрытия попапов
closeButtons.forEach((item) => item.addEventListener('click', closePopup));

//добавляю слушателей на кнопки удаления
deleteButtons.forEach((item) => item.addEventListener('click', deleteCard));

//добавляю слушателей на кнопки лайк
likeButtons.forEach((item) => item.addEventListener('click', likeCard));

//добавляю слушателя на кнопку Сохранить в попапе user-edit pop-up
popupFormProfile.addEventListener('submit', handlePopupFormSubmit);

//добавляю слушателя на кнопку Добавить в попапе add-photo pop-up
popupFormPhoto.addEventListener('submit', handleAddPhotoPopup);
