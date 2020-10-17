export default class Section {
  /*
    —— Section:
    отвечает за отрисовку элементов на странице

    —— render: применяет полученную функцию-параметр render для всех items
    —— addItem(item): добавляет item в начало this.containerSelector
  */

  constructor(renderer, containerElement){
    // this._items = items;
    this._renderer = renderer;
    this._containerElement = containerElement;
  }

  render(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._containerElement.prepend(element);
  }
}
