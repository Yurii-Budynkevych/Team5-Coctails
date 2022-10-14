
const refs = {
    input: document.querySelector('.header-input'),
    btn: document.querySelector('.menu-batton'),
    mobileMenu: document.querySelector('.header-mobile-menu'),
    list: document.querySelectorAll('.is-hidden'),
    lisBtn: document.querySelector('.favorite-btn-desctop'),
    coctailTitel: document.querySelector('.coctails-section__title'),
    cocktalisTitel: document.querySelector('.coctails-section__coctails-list'),
  };

  refs.btn.addEventListener('click', onClick);

 


 export default function onClick() {
  const expanded = refs.btn.getAttribute('aria-expanded') === 'true' || false;

  refs.btn.classList.toggle('is-open');
  refs.mobileMenu.classList.toggle('is-open');
  refs.btn.setAttribute('aria-expanded', !expanded);

  const mobileInput = document.querySelector('.header-input-mobile');


  const mobileFovoriteBtn = document.querySelector('.favorite-btn');
  const mobileList = document.querySelectorAll('.is-hidden');
  mobileFovoriteBtn.addEventListener('click', onFavoriteClick);
  function onFavoriteClick() {
    mobileList.forEach(element => {
      element.classList.toggle('is-hidden');
    });
  }
}

refs.lisBtn.addEventListener('click', onFavoriteDescktopClick);
function onFavoriteDescktopClick() {
 
  refs.list.forEach(el => {
    el.classList.toggle('is-hidden');
  });
}