import { createElement } from "./componentFunction/createElement.js";

export class Menu {
  _element = null;

  constructor({ menuIcon, linkName }) {
    this._menuIcon = menuIcon;
    this._linkName = linkName;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
  }

  _getTemplate() {
    return `<li class="nav__item">
                <i ${this._menuIcon}></i>
                <a class="nav__link">${this._linkName}</a>
            </li>`;
  }

  _setStateActive(state) {
    this._state.active = state;
  }

  get element() {
    return this._element;
  }
}
