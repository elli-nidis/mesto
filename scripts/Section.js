class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  //метод renderItems перебирает массив с начальными карточками и отрисовывает их
  renderItems() {
    //перебираю массив с начальными карточками
    this._items.forEach(item => {
      //отрисовываю карточку на странице
      this._renderer(item);
    })
}

//метод addItem вставляет карточку в конец контейнера
  addItem(item) {
    this._containerSelector.append(item);
  }

  //метод addNewItem вставляет новую карточку в начало контейнера
  addNewItem(item) {
    this._containerSelector.prepend(item);
  }
}

export {Section};