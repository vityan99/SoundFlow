import { createElement } from "./componentFunction/createElement.js";

export class Card {
  _element = null;
  _subElements = null;
  _state = {
    play: false,
  };
  _audio = null;

  static currentPlayingCard = null;

  constructor({ cardImgSrc, cardTitle, cardAlbum, audioSrc }) {
    this._cardImgSrc = cardImgSrc;
    this._cardTitle = cardTitle;
    this._cardAlbum = cardAlbum;
    this._audioSrc = audioSrc;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._audio = new Audio(this._audioSrc);
    this._addListener();
    this._render();
  }

  _getTemplate() {
    return `<div class="card">
              <div class="card__img-wrapper" data-element="imgWrapper">
                  <img src="${this._cardImgSrc}" alt="" class="card__img" />
                  <div class="card__icon play" data-element="play"><i class="fa-solid fa-play fa-2xl"></i></div>
                  <div class="card__icon pause" data-element="pause"><i class="fa-solid fa-pause fa-2xl"></i></div>
              </div>
              <div class="card__info">
                  <h3 class="card__title">${this._cardTitle}</h3>
                  <span class="card__album">${this._cardAlbum}</span>
                  <span class="card--active not--active">
                    <span class="dot"></span>
                    Проигрывается...
                  </span>
                  <audio src="${this._audioSrc}"></audio>
              </div>
          </div>`;
  }

  _setStatePlay(state) {
    this._state.play = state;
  }

  _playMusic() {
    if (this._state.play) {
      this._audio.pause();
      this._audio.currentTime = 0;
      this._setStatePlay(false);
      this._updateUI();

      if (Card.currentPlayingCard === this) {
        Card.currentPlayingCard = null;
      }
    } else {
      if (Card.currentPlayingCard && Card.currentPlayingCard !== this) {
        Card.currentPlayingCard._playMusic();
      }

      this._audio.play();
      this._setStatePlay(true);
      Card.currentPlayingCard = this;
    }
  }

  _addListener() {
    if (this._subElements.play) {
      this._subElements.play.addEventListener("click", () => {
        this._playMusic();
        this._render();
      });
    }

    if (this._subElements.pause) {
      this._subElements.pause.addEventListener("click", () => {
        this._playMusic();
        this._render();
      });
    }

    if (this._subElements.imgWrapper) {
      this._subElements.imgWrapper.addEventListener("mouseenter", () => {
        this._subElements.imgWrapper.classList.add("hover");
        this._render();
      });

      this._subElements.imgWrapper.addEventListener("mouseleave", () => {
        this._subElements.imgWrapper.classList.remove("hover");
        this._render();
      });
    }
  }

  _updateUI() {
    if (this._state.play) {
      this._subElements.imgWrapper.classList.add("active");
      this._subElements.play.style.display = "none";
      this._subElements.pause.style.display = "block";
    } else {
      this._subElements.imgWrapper.classList.remove("active");
      if (this._subElements.imgWrapper.classList.contains("hover")) {
        this._subElements.play.style.display = "block";
        this._subElements.pause.style.display = "none";
      } else {
        this._subElements.play.style.display = "none";
        this._subElements.pause.style.display = "none";
      }
    }
  }

  _render() {
    this._updateUI();
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
