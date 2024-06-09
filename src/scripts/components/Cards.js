import { createElement } from "./componentFunction/createElement.js";

export class Cards {
  _element = null;
  _subElements = null;

  constructor(Card, cardConfig) {
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
    return `<div>
                <div class="cards" data-element="cards"></div>
            </div>`;
  }

  _generateCards() {
    return this._cardConfig.map((item) => {
      return new this._Card(item).element;
    });
  }

  _render() {
    this._subElements.cards.append(...this._generateCards());
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
