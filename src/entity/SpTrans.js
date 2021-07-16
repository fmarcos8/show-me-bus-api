const api = require('../../api')

module.exports = class SpTrans {
    constructor(token) {
        this.token = token;
        this.options = {}
    }

    queryParamsBuilder(params) {
        let query = new URLSearchParams(params);
        return query.toString();
    }

    async doQueryApi(endpoint, params = null) {
        var self = this
        if (!self.cookie) {
            await this.doAuth();
        }
        if (params) {
            const query = this.queryParamsBuilder(params)
            endpoint += '?'+query
        }
        
        return await api.get(endpoint, self.options);
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
        return await this.doQueryApi('/Linha/Buscar', params);
    }

    async getLinesWay(params) {
        return await this.doQueryApi('/Linha/BuscarLinhaSentido', params);
    }

    async getStops(params) {
        return await this.doQueryApi('/Parada/Buscar', params)
    }

    async getStopsByLine(params) {
        return await this.doQueryApi('/parada/BuscarParadasPorLinha', params)
    }
}