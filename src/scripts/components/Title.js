import { createElement } from "./componentFunction/createElement.js";

export class Title {
  _element = null;

  constructor({ title }) {
    this._title = title;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
  }

  _getTemplate() {
    return `<h2 class="title">${this._title}</h2>`;
  }

  get element() {
    return this._element;
  }
}
