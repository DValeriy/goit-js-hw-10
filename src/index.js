import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debouce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const nodes = {
  inputSearch: document.querySelector('#search-box'),
  countryListNode: document.querySelector('.country-list'),
  countryInfoNode: document.querySelector('.country-info'),
};
const showContent = arrCountry => {
  const markup = arrCountry
    .map(
      ({ name, flag }) =>
        `<li class="cards">
      <img class="flag" src="${flag}  "/>
      <div ">${name}</div>
    </li>`,
    )
    .join('');
  nodes.countryListNode.innerHTML = markup;
};

const showCountryInfo = country => {
  const markup = country.map(({ languages, flag, name, capital, population }) => {
    let arrLang = [];
    for (const i of languages) arrLang.push(i.name);

    let str = `<li class="country">
      <img class="flag" src="${flag}"/>
      <ul class="card">
      <li>Name: ${name}</li>
      <li>Capital: ${capital}</li>
      <li>Population: ${population}</li>
      <li>Languages: ${arrLang.join(',')}</li>
      </ul>`;
    return str;
  });
  nodes.countryInfoNode.innerHTML = markup;
};

const fnClearAll = () => {
  nodes.countryInfoNode.innerHTML = '';
  nodes.countryListNode.innerHTML = '';
};

const handlerForInput = e => {
  const valueOfInput = nodes.inputSearch.value.trim();
  if (!valueOfInput) {
    fnClearAll();
  }
  if (valueOfInput) {
    fetchCountries(valueOfInput).then(data => {
      if (!data) {
        fnClearAll();
        return;
      }
      if (data.length > 10) {
        fnClearAll();
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      }
      if (data.length <= 10 && data.length >= 2) {
        fnClearAll();
        showContent(data);
      }
      if (data.length === 1) {
        fnClearAll();
        showCountryInfo(data);
      }
    });
  }
};
nodes.inputSearch.addEventListener('input', debouce(handlerForInput, DEBOUNCE_DELAY));
