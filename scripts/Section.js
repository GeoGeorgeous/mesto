export default class Section {
  /*
    —— Section:
    отвечает за отрисовку элементов на странице.

    —— render: применяет полученную функцию-параметр render для всех items
    —— addItem(item): добавляет item в начало this.containerSelector

    */
  constructor({items, renderer}, containerSelector){
    this._items = items;
    this._renderer = renderer();
    this.containerSelector = containerSelector;
  }

  render() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this.containerSelector.prepend(item);
  }
}
