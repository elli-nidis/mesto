import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector,) {
    super(popupSelector);
    this._photoZoomImg = this._popupElement.querySelector('.photo__img');
    this._photoZoomTitle = this._popupElement.querySelector('.photo__title');
  }

  open(link, name) {
    //устанавливаю значения для картинки
    this._photoZoomImg.src = link;
    this._photoZoomTitle.alt = name;
    this._photoZoomTitle.textContent = name;

    //открываю попап через метод родителя
    super.open();

    console.log(this._closeButton);
  }

}

export {PopupWithImage};