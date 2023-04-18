class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  renderItems() {
    //перебираю массив с начальными карточками
    this._items.forEach(item => {
      //отрисовываю карточку на странице
      this._items.forEach(item => this._renderer(item))
    })
}
    //подумать как всавить новую карточку в начало контейнера

  addItem(item) {
    this._containerSelector.append(item);
  }
}

export {Section};