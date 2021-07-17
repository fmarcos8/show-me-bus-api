const api = require('../../api')
const helpers = require('../helpers')
const Endpoits = require('../constants/Endpoits')

module.exports = class SpTrans {
    constructor(token) {
        this.token = token;
        this.options = {}
    }

    queryParamsBuilder(params) {
        let query = new URLSearchParams(params);
        return query.toString();
    }

    async doQueryApi({ path, type }, params = null) {
        var self = this
        if (!self.cookie) {
            await this.doAuth();
        }
        if (params) {
            const query = this.queryParamsBuilder(params)
            path += '?'+query
        }
        
        return await api.get(path, self.options).then((res) => {
            return this.handleResponse(res, type)
        });
    }

    async doAuth() {
        let self = this;
        const query = this.queryParamsBuilder({ token: this.token })
        return api.post('/Login/Autenticar?'+query)
            .then(res => {
                self.cookie = res.headers['set-cookie'];
                self.options = {
                    headers: {
                        Cookie: self.cookie
                    }
                }
            })
    }

    async getLines(params) {
        return await this.doQueryApi(Endpoits.GET_LINE, params);
    }

    async getLinesWay(params) {
        return await this.doQueryApi(Endpoits.GET_LINE_DIRECTION, params);
    }

    async getStops(params) {
        return await this.doQueryApi('/Parada/Buscar', params)
    }

    async getStopsByLine(params) {
        return await this.doQueryApi('/parada/BuscarParadasPorLinha', params)
    }

    handleResponse(response, type) {
        const { data } = response
        const responseTypes = {
            lines: helpers.linesResponse,
            linesDirection: helpers.linesDirectionResponse
        }
        
        return responseTypes[type](data)
    }    
}