import { createElement } from "./componentFunction/createElement.js";

export class Aside {
  _element = null;
  _subElements = null;

  constructor(logoConfig, Logo, menuConfig, Menu) {
    this._logoConfig = logoConfig;
    this._Logo = Logo;
    this._menuConfing = menuConfig;
    this._Menu = Menu;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._render();
  }

  _getTemplate() {
    return `<aside class="menu">
                <div class="menu__content">
                  <div class="logo" data-element="logo"></div>
                  <nav class="nav">
                    <ul class="nav__list" data-element="nav"></ul>
                  </nav>
                </div>
            </aside>`;
  }

  _generateLogo() {
    return new this._Logo(this._logoConfig).element;
  }

  _generateMenu() {
    return this._menuConfing.map((item) => {
      return new this._Menu(item).element;
    });
  }

  _render() {
    this._subElements.logo.append(this._generateLogo());
    this._subElements.nav.append(...this._generateMenu());
  }

  _getSubElements() {
    return Array.from(this._element.querySelectorAll("[data-element]")).reduce((acc, el) => {
      return {
        ...acc,
        [el.getAttribute("data-element")]: el,
      };
    }, {});
  }

  get element() {
    return this._element;
  }
}
