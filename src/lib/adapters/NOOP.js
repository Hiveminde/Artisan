module.exports = class NOOP {

    constructor(config) {
        Object.assign(this, config)
    }

    async create(dataArray) {
        return dataArray[0]
    }

    async read(queryArray) {
        return {username: 'twincharged', email: 'joe@hiveminde.com'}
    }

    async update(queryArray, dataArray) {
        return {username: 'joe', email: 'joe@hiveminde.com'}
    }

    async delete(queryArray) {
        return true
    }

}
