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
 * функция создания карточки на основе шаблона
 */
function createCard(data) {
  //клонирую шаблон карточки
  const cardElement = templateCard.querySelector('.card').cloneNode(true);

  const photoImg = cardElement.querySelector('.card__img');
  const photoTitle = cardElement.querySelector('.card__title');

  //наполняю содержимым из данных объекта, полученного на входе в ф-цию
  photoImg.src = data.link;
  photoImg.alt = data.name;
  photoTitle.textContent = data.name;

  //нахожу кнопку удаления картинки
  const buttonDelete = cardElement.querySelector('.card__delete-button');

  // нахожу кнопку лайка 🤍
  const buttonLike = cardElement.querySelector('.card__like-button');

  //нахожу кнопку, открывающую попап
  const buttonOpen = cardElement.querySelector('.open-button');

  //добавляю слушателя на кнопку открытия попапа photo-zoom
  buttonOpen.addEventListener('click', (event) => {
    openPopup(photoZoomPopup);
    photoZoomImg.src = event.target.src;
    photoZoomImg.alt = event.target.alt;
    photoZoomTitle.textContent = event.target.alt;
  });

  //добавляю слушателя на кнопку удаления
  buttonDelete.addEventListener('click', deleteCard);

  //добавляю слушателя на кнопку лайк 🤍
  buttonLike.addEventListener('click', likeCard);

  //возвращаю готовый элемент, который можно размещать в вёрстке
  return cardElement;
};

/**
* функция отрисовки новой (добавленной вручную) карточки на странице
*/
function addCard(data) {
  //создаю экземпляр карточки с помощью ф-ции createCard
  const cardElement = createCard(data);

  //отображаю карточку на странице
  photoGrid.prepend(cardElement);
};

//отрисовываю карточки при загрузке страницы
initialCards.forEach((card) => {
  photoGrid.append(createCard(card));
});

/**
 * функция открытия попапа
 */
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

/**
 * функция закрытия попапа
 */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
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
  photoForm.reset();

  //отрисовываю на странице новую карточку
  addCard(newCard);
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
 * функция добавления/удаления лайка картинке 🤍
 */
function likeCard(event) {
  const activeLike = event.target;
  activeLike.classList.toggle('card__like-button_active');
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