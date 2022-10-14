'use strict';
import debounce from 'lodash.debounce';
import mainFunction from './coctails';
const coctailsList = document.querySelector('.coctails-section__coctails-list');
let arrayLength = 0;

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';
const DEBOUNCE_DELAY = 500;
const refs = {
  input: document.querySelector('.header-input'),
  btn: document.querySelector('.menu-batton'),
  mobileMenu: document.querySelector('.header-mobile-menu'),
  list: document.querySelectorAll('.is-hidden'),
  lisBtn: document.querySelector('.favorite-btn-desctop'),
  coctailTitel: document.querySelector('.coctails-section__title'),
  cocktalisTitel: document.querySelector('.coctails-section__coctails-list'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
function onInput(evt) {
  let serchQuery = evt.target.value.trim();

  fetch(`${BASE_URL}search.php?s=${serchQuery}`)
    .then(response => response.json())
    .then(response => {
      const { drinks } = response;
      if (drinks === null) {
        return responsNull();
      } else {
        refs.coctailTitel.classList.add('coctails-section__title');
        refs.coctailTitel.classList.remove('coctails-section-coctailTitel');

        coctailsList.classList.remove('coctails-section-hover');
        refs.cocktalisTitel.innerHTML = '';
        refs.coctailTitel.textContent = `Searching results`;
        arrayLength = response.drinks.length;
        mainFunction(
          1,
          `${BASE_URL}search.php?s=${serchQuery}`,
          arrayLength,
          coctailsList
        );
      }
    });
  clerrElement();
}
// ______________________________________________________
// menu btn
refs.btn.addEventListener('click', onClick);
function onClick() {
  const expanded = refs.btn.getAttribute('aria-expanded') === 'true' || false;

  refs.btn.classList.toggle('is-open');
  refs.mobileMenu.classList.toggle('is-open');
  refs.btn.setAttribute('aria-expanded', !expanded);

  const mobileInput = document.querySelector('.header-input-mobile');
  mobileInput.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

  const mobileFovoriteBtn = document.querySelector('.favorite-btn');
  const mobileList = document.querySelectorAll('.is-hidden');
  mobileFovoriteBtn.addEventListener('click', onFavoriteClick);
  function onFavoriteClick() {
    mobileList.forEach(element => {
      element.classList.toggle('is-hidden');
    });
  }
}
// ______________________________________________________
// favourite btn
refs.lisBtn.addEventListener('click', onFavoriteDescktopClick);
function onFavoriteDescktopClick() {
  refs.list.forEach(el => {
    el.classList.toggle('is-hidden');
  });
}

function clerrElement() {
  const removeTarget = document.querySelector('.is-hover');
  if (removeTarget) {
    removeTarget.classList.remove('is-hover');
  }
}

function responsNull() {
  coctailsList.classList.add('coctails-section-hover');
  refs.cocktalisTitel.innerHTML = '';
  const sorryCocktaili = sorryCocktailFor();

  refs.coctailTitel.classList.remove('coctails-section__title');
  refs.coctailTitel.classList.add('coctails-section-coctailTitel');

  refs.coctailTitel.textContent = `Sorry, we didn't find any cocktail for you`;
  refs.cocktalisTitel.innerHTML = sorryCocktaili;
}

function sorryCocktailFor() {
  return `<div class='coctails-section__coctails-img-div'>
  <div class='coctails-section__coctails-img'></div>
  </div>`;
}
