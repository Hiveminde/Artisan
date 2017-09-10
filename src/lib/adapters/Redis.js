import redis from 'redis'


class Redis {

    constructor(config) {
        Object.assign(this, config)
        this.collection = redis.connection().subscribe(config.klass)
    }

    async create(dataArray) {
        return await this.collection.set(dataArray)
    }

    async read(queryArray) {
        return await this.collection.get(queryArray)
    }

    async update(queryArray, dataArray) {
        return await this.collection.put(queryArray, dataArray)
    }

    async delete(queryArray) {
        return await this.collection.del(queryArray)
    }

}