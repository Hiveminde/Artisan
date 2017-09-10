import mongoose from 'mongoose'


class Mongo {

    constructor(config) {
        this.klass = config.klass
        this.collection = mongoose.connections[0].collections[this.klass]
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

    async delete(queryArray) {
        return await this.collection.delete(queryArray)
    }

}
