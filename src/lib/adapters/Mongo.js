const mongoose = require('mongoose')


class Mongo {

    constructor(config) {
        Object.assign(this, config)
        this.collection = mongoose.connections[0].collections[this.klass]

        if (!this.collection) {
            this.collection = mongoose.createSchema('User', this.schema)
        }
    }

    async create(dataArray) {
        return await this.collection.create(dataArray)
    }

    async read(queryArray) {
        return await this.collection.find(queryArray)
    }

    async update(queryArray, dataArray) {
        return await this.collection.update(queryArray, dataArray)
    }

    async destroy(queryArray) {
        return await this.collection.destroy(queryArray)
    }

}

module.exports = Mongo


// new Mongo({
//     klass: 'User',
//     schema: {
//         username: String,
//         email: String
//     }
// })