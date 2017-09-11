class NOOP {

    constructor(config) {
        Object.assign(this, config)
    }

    async create(dataArray) {
        return await dataArray
    }

    async read(queryArray) {
        return await [{username: 'twincharged', email: 'joe@hiveminde.com'}]
    }

    async update(queryArray, dataArray) {
        return await [{username: 'joe', email: 'joe@hiveminde.com'}]
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