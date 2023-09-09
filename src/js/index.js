
import '../styles.css';

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from "./configs/cat-api.js";
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


  const  select = document.querySelector('.breed-select');
   const loading = document.querySelector('.loader');
   const error =  document.querySelector('.error');
   const catCard = document.querySelector('.cat-info');
  
   loading.classList.replace('loader', 'is-hidden');
   error.classList.add('is-hidden');
   catCard.classList.add('is-hidden');

Loading.dots({
  svgColor: '#5897fb',
  svgSize: '130px',
  messageFontSize: '30px',
});

fetchBreeds()
  .then(data => {
    select.classList.add('breed-select');
    loading.classList.replace('loader', 'is-hidden');
    
  
console.log(createMarkupOptins(data))
  
    select.insertAdjacentHTML('beforeend', createMarkupOptins(data));
    new SlimSelect({
      select: select,
  settings: {
    placeholderText: 'Select a cat',
  }
    });
  })
  .catch(err => {
    Notify.failure(error.textContent);
  })
  .finally(result => Loading.remove());
// const createMarkupOptins = (arr, select) => {
//     const markup = arr.map((item) => `<option value=${item.id}>${item.name}</option>`) 
//     .join(``);
//     select.insertAdjacentHTML('afterbegin', option);
// }
function createMarkupOptins(arr) {
  return arr
    .map(({ id, name }) => {
    //   console.log({ id, name });

      return `<option value=${id}>${name}</option>`;
     
    })
    .join('');

}


select.addEventListener('change', e => {
  const id = e.target.value;

  Loading.dots({
    svgColor: '#5897fb',
    svgSize: '130px',
    messageFontSize: '30px',
  });

  fetchCatByBreed(id)
    .then(catInfo => {
      catCard.classList.replace(`is-hidden`, 'cat-info');
      createMarkupCards(catInfo);
    })
    .catch(err => {
      Notify.failure(error.textContent);
    })
    .finally(result => Loading.remove());
});

// const createMarkupCards = (arr, catCard) => {
//     const markup = arr.map((url, name, description, temperament) => `<img class="cat-img" src="${item.url}" alt="${item.breeds.name}"  >
//     <div class="cat-right">
//    <h1 class="name">${item.breeds.name}</h1>
//    <p class="description">${item.breeds.description}</p>
//    <p class="temperament"><span class="temperament-span">Temperament:</span> ${item.breeds.temperament}</p>    
//    </div>`) 
//     .join(``);
//     catCard.insertAdjacentHTML('afterend', markup);
// }

  function createMarkupCards(data) {
    const {
        breeds: [{ name, description, temperament }],
        url,
      } = data;
  
    const card = ` 
        <img class="cat-img" src="${url}" alt="${name}"  >
         <div class="cat-right">
        <h1 class="name">${name}</h1>
        <p class="description">${description}</p>
        <p class="temperament"><span class="temperament-span">Temperament:</span> ${temperament}</p>    
        </div>`;
    catCard.innerHTML = card;
  }