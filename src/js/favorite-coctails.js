'use strict';
const favoriteCocktailsList = document.querySelector(
  '.favorite-coctails-section__coctails-list'
);
console.log(favoriteCocktailsList);
import mainFunction from './coctails';
let currentCocktailName = '';
let i = 0;
console.log(JSON.parse(localStorage.getItem('favoriteCoctails')).length);

const arrayLength = JSON.parse(localStorage.getItem('favoriteCoctails')).length;
for (i; i < arrayLength; i += 1) {
  const currentCocktails = JSON.parse(localStorage.getItem('favoriteCoctails'));
  currentCocktailName = currentCocktails[i];
  console.log(currentCocktailName);

  mainFunction(
    2,
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${currentCocktailName}`,
    1,
    favoriteCocktailsList
  );
}
