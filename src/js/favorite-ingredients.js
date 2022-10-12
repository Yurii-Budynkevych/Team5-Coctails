'use strict';
const favoriteIngredientsList = document.querySelector(
  '.favorite-ingredients-section__coctails-list'
);
console.log(favoriteIngredientsList);
import mainFunction from './coctails';

// НУЖНО ЛИБО ПЕРЕПИСЫВАТЬ ВЕСЬ ЦИКЛ,
// ЛИБО ИМПОРТИРОВАТЬ ВСЕ ФУНКЦИИ И СОБИРАТЬ ПО ЧАСТЯМ ЕГО
// ЛИБО СДЕЛАТЬ searchIn = 3 В ОСНОВНОМ ФАЙЛЕ И ДОБАВИТЬ ФИЛЬТРОВ
// НАПРИМЕР ИЗМЕНИТЬ ФУНКЦИЮ СОЗДАНИЯ РАЗМЕТКИ
// А ЕЩЕ НУЖНО РАЗОБРАТЬСЯ ПОЧЕМУ РАБОТАЕТ ЛИБО ТОЛЬКО РАНДОМ, ЛИБО ТОЛЬКО ИЗБРАННОЕ

let currentIngredientlName = '';
let i = 0;
console.log(JSON.parse(localStorage.getItem('favoriteIngredients')).length);

const arrayLength = JSON.parse(
  localStorage.getItem('favoriteIngredients')
).length;
for (i; i < arrayLength; i += 1) {
  const currentIngredients = JSON.parse(
    localStorage.getItem('favoriteIngredients')
  );
  currentIngredientlName = currentIngredients[i];
  console.log(currentIngredientlName);

  mainFunction(
    2,
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${currentIngredientlName}`,
    1,
    favoriteIngredientsList
  );
}
