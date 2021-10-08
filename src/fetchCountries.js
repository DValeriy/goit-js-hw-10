import config from './config.json';

export const fetchCountries = name => {
  return fetch(`${config.baseUrlStart}${name}${config.baseUrlEnd}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data.status === 404) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      } else return data;
    });
};
// fOR FUTURE EXPERIMENT

// export const fetchCountries = (name) => {
//     return fetch(`${config.baseUrlStart}${name}${config.baseUrlEnd}`)
//     .then((response) => {
//       if (response.ok) return response.json()
//       return response.json().then(res => Promise.reject(res));
//       // if (!response.ok)  throw new Error(`is not ok: ` +response.status);
//       // if (!response.ok)  return Promise.reject(`Oops, there is no country with that name`);
//       // throw new Error(response.status);
//       ;
//     })
//     // .then(data => console.log(data))
//   .catch(error =>  Notiflix.Notify.failure(`Oops, there is no country with that name`));
// };

// Notiflix.Notify.success('Sol lucet omnibus');
// Notiflix.Notify.failure('Qui timide rogat docet negare');
// Notiflix.Notify.warning('Memento te hominem esse');
// Notiflix.Notify.info('Cogito ergo sum');
