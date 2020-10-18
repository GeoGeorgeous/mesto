export default class Section {
  /*
    —— Section:
    отвечает за отрисовку элементов на странице

    —— render: применяет полученную функцию-параметр render для всех items
    —— addItem(item): добавляет item в начало this.containerSelector
  */

  constructor(values) {
    this._renderer = values.renderer;
    this._containerElement = values.containerElement;
  }

  render(elements) {
    elements.forEach(element => {
      this._renderer(element);
    });
  }

  addItem(element) {
    this._containerElement.prepend(element);
  }
}
