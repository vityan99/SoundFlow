import { createElement } from "./components/componentFunction/createElement.js";
import { Aside } from "./components/Aside.js";
import { logoConfig } from "./components/componentsConfig/logoConfig.js";
import { Logo } from "./components/Logo.js";
import { menuConfig } from "./components/componentsConfig/menuConfig.js";
import { Menu } from "./components/Menu.js";
import { MainSection } from "./components/MainSection.js";
import { searchConfig } from "./components/componentsConfig/searchConfig.js";
import { Search } from "./components/Search.js";
import { userConfig } from "./components/componentsConfig/userConfig.js";
import { User } from "./components/User.js";
import { CardArea } from "./components/CardArea.js";
import { mainTitleConfig } from "./components/componentsConfig/titleConfig.js";
import { collectionsTitleConfig } from "./components/componentsConfig/titleConfig.js";
import { Title } from "./components/Title.js";
import { Cards } from "./components/Cards.js";
import { mainCardConfig } from "./components/componentsConfig/cardConfig.js";
import { collectionsCardConfig } from "./components/componentsConfig/cardConfig.js";
import { Card } from "./components/Card.js";

class App {
  _element = null;
  _subElements = null;

  constructor(
    Aside,
    logoConfig,
    Logo,
    menuConfig,
    Menu,
    MainSection,
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
    this._Aside = Aside;
    this._logoConfig = logoConfig;
    this._Logo = Logo;
    this._menuConfig = menuConfig;
    this._Menu = Menu;
    this._MainSection = MainSection;
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
    this._setPortalBackground();
    this._render();
  }

  _getTemplate() {
    return `<div class="app">
              <div class="app-content" data-element="appContent"></div>
              <section class="player" data-element="player"></section>
            <div>`;
  }

  _generateAside() {
    return new this._Aside(this._logoConfig, this._Logo, this._menuConfig, this._Menu).element;
  }

  _generateMainSection() {
    return new this._MainSection(
      this._searchConfig,
      this._Search,
      this._userConfig,
      this._User,
      this._CardArea,
      this._mainTitleConfig,
      this._collectionsTitleConfig,
      this._Title,
      this._Cards,
      this._mainCardConfig,
      this._collectionsCardConfig,
      this._Card
    ).element;
  }

  _render() {
    this._subElements.appContent.append(this._generateAside());
    this._subElements.appContent.append(this._generateMainSection());
  }

  _setPortalBackground() {
    const now = new Date();
    const hours = now.getHours();

    const isNightTime = hours >= 19 || hours < 7;

    const body = document.body;

    if (isNightTime) {
      body.classList.add("mode--day");
      body.classList.remove("mode--night");
    } else {
      body.classList.add("mode--night");
      body.classList.remove("mode--day");
    }
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

const root = document.querySelector(".root");
const app = new App(
  Aside,
  logoConfig,
  Logo,
  menuConfig,
  Menu,
  MainSection,
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
);
root.insertAdjacentElement("beforeend", app.element);
