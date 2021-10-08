import config from './config.json';

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

export const fetchCountries = name => {
  return fetch(`${config.baseUrlStart}${name}${config.baseUrlEnd}`)
    .then(response => {
      console.log(response.ok);

      return response.json();
    })
    .then(data => {
      if (data.status === 404) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      } else return data;
    });
};

// fetch(url)
//     .then(resp => (resp.ok)
//         ? resp.json()
//         : Promise.reject('is not ok: ' + resp.status)
//     )
//     .catch((err) => {
//         console.warn(err)
//     })

// fetch(url)
//     .then(resp => {
//         if (!resp.ok) {
//             throw Error(`is not ok: ` + resp.status);
//         }
//     return resp.json();
//     })
//     .catch((err) => {
//         console.warn(err)
//     })
