import { createElement } from "./componentFunction/createElement.js";

export class Search {
  _element = null;

  constructor({ searchIcon, searchPlaceholder }) {
    this._searchIcon = searchIcon;
    this._searchPlaceholder = searchPlaceholder;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
  }

  _getTemplate() {
    return `<div class="search-container">
              <i ${this._searchIcon}></i>
              <input class="app-search" type="search" name="" id="" placeholder="${this._searchPlaceholder}" />
            </div>`;
  }

  get element() {
    return this._element;
  }
}
