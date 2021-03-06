import fetch from 'fetch'


class HTTP {

    constructor(config) {
        Object.assign(this, config)
        this.baseRoute = `/${this.klass}`
    }

    async create(dataArray) {
        return await (await fetch(this.baseRoute, {
            method: 'POST',
            data: dataArray
        })).json()
    }

    async read(queryArray) {
        return await (await fetch(this.baseRoute + this._serializeParams(queryArray[0]), {
            method: 'GET'
        })).json()
    }

    async update(queryArray, dataArray) {
        return await (await fetch(this.baseRoute, {
            method: 'PUT',
            data: {
                query: queryArray[0],
                data: dataArray
            }
        })).json()
    }

    async destroy(queryArray) {
        return await (await fetch(this.baseRoute, {
            method: 'DELETE',
            data: queryArray
        })).json()
    }

    _serializeParams(obj) {
        return ('?' + Object.keys(obj).reduce((a, k) => {
            a.push(k+'='+encodeURIComponent(obj[k]))
            return a
        }).join('&'))
    }

}
