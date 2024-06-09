import { createElement } from "./componentFunction/createElement.js";

export class User {
  _element = null;

  constructor({ userSrc }) {
    this._userSrc = userSrc;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
  }

  _getTemplate() {
    return `<div class="user">
                <img src="${this._userSrc}" alt="Фото пользователя" class="user-logo" />
            </div>`;
  }

  get element() {
    return this._element;
  }
}
