const axios = require("axios");

const api = axios.create({
    contentType: 'application/json',
    baseURL: 'http://api.olhovivo.sptrans.com.br/v2.1/'
})

// api.interceptors.response.use(
//     ok => ok.data,
//     err => err
// )

module.exports = api;