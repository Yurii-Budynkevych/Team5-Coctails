'use strict';
function creaitMarkapArr(e) { 
    return e.map(e => {
        return `<li class=hero__span><span data-name=${e}>${e}</span></li>`
    });
    }
    
    const arrr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0']
    const dd = document.querySelector('.hero-list');
    function name(arrr) {
      
        const markap = creaitMarkapArr(arrr)
        dd.insertAdjacentHTML('beforeend',markap.join(''))
    //  dd.innerHTML = markap.join('')
    }
    
    name(arrr)

    