class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //метод renderItems перебирает массив с начальными карточками и отрисовывает их
  renderItems(cards) {
    cards.forEach((card) => {
      this._renderer(card)
    })
  }

  //метод addItem вставляет карточку в конец контейнера
  addItem(item) {
    this._container.append(item);
  }

  //метод addNewItem вставляет новую карточку в начало контейнера
  addNewItem(item) {
    this._container.prepend(item);
  }
}

export {Section};