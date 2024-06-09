import { createElement } from "./componentFunction/createElement.js";

export class MainSection {
  _element = null;
  _subElements = null;
  _state = {
    play: false,
  };

  constructor(
    searchConfig,
    Search,
    userConfig,
    User,
    CardArea,
    mainTitleConfig,
    collectionsTitleConfig,
    Title,
    Cards,
    mainCardConfig,
    collectionsCardConfig,
    Card
  ) {
    this._searchConfig = searchConfig;
    this._Search = Search;
    this._userConfig = userConfig;
    this._User = User;
    this._CardArea = CardArea;
    this._mainTitleConfig = mainTitleConfig;
    this._collectionsTitleConfig = collectionsTitleConfig;
    this._Title = Title;
    this._Cards = Cards;
    this._mainCardConfig = mainCardConfig;
    this._collectionsCardConfig = collectionsCardConfig;
    this._Card = Card;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._render();
  }

  _getTemplate() {
    return `<section class="main">
              <div class="main__top" data-element="top"></div>
              <div class="main__content" data-element="content"></div>
            </section>`;
  }

  _setStatePlay(state) {
    this._state.play = state;
  }

  _setStatePlayHandler(state) {
    this._setStatePlay(state);
  }

  _generateSearch() {
    return new this._Search(this._searchConfig).element;
  }

  _generateUser() {
    return new this._User(this._userConfig).element;
  }

  _generateCardAreaMain() {
    return new this._CardArea(this._Title, this._mainTitleConfig, this._Cards, this._Card, this._mainCardConfig).element;
  }

  _generateCardAreaCollections() {
    return new this._CardArea(this._Title, this._collectionsTitleConfig, this._Cards, this._Card, this._collectionsCardConfig).element;
  }

  _render() {
    this._subElements.top.append(this._generateSearch());
    this._subElements.top.append(this._generateUser());
    this._subElements.content.append(this._generateCardAreaMain());
    this._subElements.content.append(this._generateCardAreaCollections());
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
