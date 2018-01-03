// import fetch from './fetch'

export default class HTTPAdapter {
    constructor(config = {}) {
        Object.assign(this, config)
        this.baseRoute = `/${this.klass}`
    }

    async create(payload = []) {
        return await (await window.fetch(this.baseRoute, {
            method: 'POST',
            body: JSON.stringify(payload)
        })).json()
    }

    async read(query = []) {
        const url = this._buildURL(query)
        return await (await window.fetch(url, {
            method: 'GET'
        })).json()
    }

    async update(query = [], payload = []) {
        const url = this._buildURL(query)
        return await (await window.fetch(url, {
            method: 'PUT',
            body: JSON.stringify(payload)
        })).json()
    }

    async destroy(query = []) {
        return await (await window.fetch(this.baseRoute, {
            method: 'DELETE',
            body: JSON.stringify(query)
        })).json()
    }

    _buildURL(query = []) {
        return query.length ? `${this.baseRoute}?${serializeQuery(query[0])}` : this.baseRoute
    }
}

function serializeQuery(obj) {
    return Object.keys(obj)
        .map(k => k + '=' + encodeURIComponent(obj[k]))
        .join('&')
}
