'use strict';
const favoriteIngredientsList = document.querySelector(
  '.favorite-ingredients-section__ingredients-list'
);
const ingredientModal = document.querySelector(
  '.coctails-section__ingredient-modal'
);
const ingredientModalBackdrop = document.querySelector(
  '.coctails-section__ingredient-modal-backdrop'
);
import { fetchCoctailOrIngredient } from './coctails';
import { checkFavoriteOrNot } from './coctails';
import { makeFavoriteOrNot } from './coctails';
import { modalToggleHidden } from './coctails';
import { modalButtonTextChange } from './coctails';
import { ingredientModalMarckup } from './coctails';

let ingredientNumber = 0;
let favoriteIngredients = [];
try {
  if (JSON.parse(localStorage.getItem('favoriteIngredients')).length !== 0) {
    favoriteIngredients = JSON.parse(
      localStorage.getItem('favoriteIngredients')
    );
  }
} catch {
  localStorage.setItem(
    'favoriteIngredients',
    JSON.stringify(favoriteIngredients)
  );
}

let currentIngredientlName = '';
let i = 0;

const arrayLength = JSON.parse(
  localStorage.getItem('favoriteIngredients')
).length;
for (i; i < arrayLength; i += 1) {
  const currentIngredients = JSON.parse(
    localStorage.getItem('favoriteIngredients')
  );

  currentIngredientlName = currentIngredients[i];
  fetchCoctailOrIngredient(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${currentIngredientlName}`
  ).then(newResponse => {
    ingredientNumber += 1;
    const { ingredients } = newResponse;
    const { strIngredient, strType } = ingredients[0];
    favoriteIngredientsList.innerHTML += `<li class="favorite-ingredients-section__ingredient">
        <div class="favorite-ingredients-section__ingredient-card">
          <h3 class="favorite-ingredients-section__card-title">${strIngredient}</h3>
          <p class="favorite-ingredients-section__card-type">${strType}</p>
          <button class="favorite-ingredients-section__button favorite-ingredients-section__learn-button" type="button">Learn more</button>
                    <button class="favorite-ingredients-section__button favorite-ingredients-section__favorite-button favorite-ingredients-section__like-button" type="button" id="likeBtn${ingredientNumber}">Add to</button>
        </div>
      </li>`;

    checkFavoriteOrNot(
      strIngredient,
      'favorite-ingredients-section__like-button',
      'favorite-ingredients-section__dislike-button',
      'Remove',
      ingredientNumber,
      'Ingredients'
    );
    // выбираем все созданные карточки коктейлей(вне зависимости от итерации)
    const ingredinetCards = document.querySelectorAll(
      '.favorite-ingredients-section__ingredient-card'
    );

    //вешаем слушателя события на все КАРТОЧКИ коктейлей(именно на карточки)
    ingredinetCards.forEach(elem => {
      elem.addEventListener('click', event => {
        //создаём переменную, которая будет содержать имя коктейля текущей итерации цикла
        const currentItemlName = event.currentTarget.querySelector(
          '.favorite-ingredients-section__card-title'
        ).textContent;
        //добавляем/удаляем коктейль/игредиент в избранное
        makeFavoriteOrNot(
          event,
          'favorite-ingredients-section__like-button',
          'favorite-ingredients-section__dislike-button',
          currentItemlName,
          favoriteIngredients,
          'Ingredients'
        );

        // при нажатии на кнопку "узнать больше"
        if (
          event.target.classList.contains(
            'favorite-ingredients-section__learn-button'
          )
        ) {
          // запоминаем айди текущей кнопки лайка, чтоб если лайк ставился на модалке - менялась кнопка на главной
          const currentIngredientNumber = event.currentTarget
            .querySelector('.favorite-ingredients-section__favorite-button')
            .getAttribute('id');
          console.log(currentIngredientNumber);
          // забираем у бекенда коктейль, на карточке которого открывается модалка
          // и получаем всю нужную инфу для модалки
          fetchCoctailOrIngredient(
            `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${currentItemlName}`
          ).then(newResponse => {
            const ingredient = newResponse;
            console.log(ingredient);
            const {
              strAlcohol = '',
              strDescription = '',
              strIngredient = '',
              strType = '',
            } = ingredient.ingredients[0];

            // создаем изначальную разметку модалки
            ingredientModalMarckup(
              ingredientModal,
              strIngredient,
              strDescription,
              strType,
              strAlcohol
            );

            // создаём переменную текущей кнопки "добавить в избранное"
            const ingredientModalLikeBtn = document.querySelector(
              '.ingredient-modal__like-ingredient-btn'
            );

            // проверяем находится ли коктейль в списке избранных,
            // меняем текст кнопки в зависимости от того есть или нет
            checkFavoriteOrNot(
              strIngredient,
              'ingredient-modal__like-ingredient-btn',
              'ingredient-modal__dislike-ingredient-btn',
              'Remove from favorites',
              ingredientNumber,
              'Ingredients'
            );

            // вешаем слушателя события добавления/удаления в избранные
            ingredientModalLikeBtn.addEventListener('click', event => {
              const currentItemlName = strIngredient;
              makeFavoriteOrNot(
                event,
                'ingredient-modal__like-ingredient-btn',
                'ingredient-modal__dislike-ingredient-btn',
                currentItemlName,
                favoriteIngredients,
                'Ingredients'
              );
              //меняем текст кнопки на длинный(на модалках он отличается)
              modalButtonTextChange(
                ingredientModalLikeBtn,
                'favorite-ingredients-section__like-button'
              );

              // меняем так же копку добавления/удаления в избранное на главной странице
              const currentLikeButton = document.querySelector(
                `#${currentIngredientNumber}`
              );
              currentLikeButton.classList.toggle(
                'favorite-ingredients-section__like-button'
              );
              currentLikeButton.classList.toggle(
                'favorite-ingredients-section__dislike-button'
              );
              if (
                currentLikeButton.classList.contains(
                  'favorite-ingredients-section__like-button'
                )
              ) {
                currentLikeButton.textContent = 'Add to';
              } else {
                currentLikeButton.textContent = 'Remove';
              }
              console.log(
                ingredientModalLikeBtn,
                ingredientModalLikeBtn.textContent
              );

              if (
                ingredientModalLikeBtn.classList.contains(
                  'ingredient-modal__like-ingredient-btn'
                )
              ) {
                ingredientModalLikeBtn.textContent = 'Add to favorite';
              }
            });

            // открываем модалку
            modalToggleHidden(
              ingredientModalBackdrop,
              'coctails-section__ingredient-modal-backdrop--is-hidden',
              ingredientModal,
              'coctails-section__ingredient-modal--is-hidden'
            );

            // вешаем на кнопку закрытия модалки функцию, которая закроет модалку
            const closeIngredientlModalBtn = document.querySelector(
              '.ingredient-modal__close-ingredient-btn'
            );
            closeIngredientlModalBtn.addEventListener('click', () => {
              modalToggleHidden(
                ingredientModalBackdrop,
                'coctails-section__ingredient-modal-backdrop--is-hidden',
                ingredientModal,
                'coctails-section__ingredient-modal--is-hidden'
              );
            });
          });
        }
      });
    });
  });
}
