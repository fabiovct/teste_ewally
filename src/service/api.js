import axios from 'axios';

// const api = axios.create({
//   baseURL:'https://apidev.ewally.com.br/',
//     // baseURL: 'http://ewally.com.br/',
//     headers: {
//       'Authorization': 'Bearer '+localStorage.token_ewally,
//       'Content-Type': 'application/json',
//         //'auth': localStorage.token,
//         // 'Content-Type': 'multipart/form-data'
//       }
// });

// export default api;


const api = axios.create({ baseURL: 'https://apidev.ewally.com.br/' });

api.interceptors.request.use(async function (config) {

  const myToken = localStorage.token_ewally;
  config.headers['Authorization'] = myToken ? 'Bearer '+myToken : '';
  return config;

});

export default api; 