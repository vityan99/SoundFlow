import { createElement } from "./componentFunction/createElement.js";

export class Logo {
  _element = null;

  constructor({ logoLink, logoSrc }) {
    this._logoLink = logoLink;
    this._logoSrc = logoSrc;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
  }

  _getTemplate() {
    return `<a href="${this._logoLink}" class="logo__link"><img src="${this._logoSrc}" alt="" class="logo" /></a>`;
  }

  get element() {
    return this._element;
  }
}
