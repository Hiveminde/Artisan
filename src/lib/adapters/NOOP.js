import {generateUUID} from '../Utils'

export default class NOOP {

    constructor(config = {}) {
        Object.assign(this, config)
    }

    async create(data = []) {
        data.map(d => d.id = generateUUID())
        return await data
    }

    async read(query = []) {
        return await query
    }

    async update(query = [], data = []) {
        const mockData = query.map((q, i) => Object.assign(q, data[i]))
        return await mockData
    }

    async destroy(query = []) {
        return await [true]
    }

}