import { createElement } from "./componentFunction/createElement.js";

export class CardArea {
  _element = null;
  _subElements = null;

  constructor(Title, titleConfig, Cards, Card, cardConfig) {
    this._Title = Title;
    this._titleConfig = titleConfig;
    this._Cards = Cards;
    this._Card = Card;
    this._cardConfig = cardConfig;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._render();
  }

  _getTemplate() {
    return `<div class="card-area">
                <div class="area-title" data-element="areaTitle"></div>
                <div class="area-content" data-element="areaContent"></div>
            </div>`;
  }

  _generateTitle() {
    return new this._Title(this._titleConfig).element;
  }

  _generateCards() {
    return new this._Cards(this._Card, this._cardConfig).element;
  }

  _render() {
    this._subElements.areaTitle.append(this._generateTitle());
    this._subElements.areaContent.append(this._generateCards());
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
