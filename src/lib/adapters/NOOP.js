class NOOP {

    constructor(config) {
        Object.assign(this, config)
    }

    async create(dataArray) {
        return await dataArray
    }

    async read(queryArray) {
        return await queryArray
    }

    async update(queryArray, dataArray) {
        return await queryArray.map((q, i) => Object.assign(q, dataArray[i]))
    }

    async delete(queryArray) {
        return await queryArray
    }

}

if (typeof window === 'undefined') {
    module.exports = NOOP
} else {
    window.NOOP = NOOP
}