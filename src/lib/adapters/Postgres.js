import postgres from 'postgres'


class Postgres {

    constructor(config) {
        Object.assign(this, config)
        this.table = postgres.connection().tables[this.klass]
    }

    async create(dataArray) {
        return await this.table.create(dataArray)
    }

    async read(queryArray) {
        return await this.table.find(queryArray)
    }

    async update(queryArray, dataArray) {
        return await this.table.update(queryArray, dataArray)
    }

    async delete(queryArray) {
        return await this.table.delete(queryArray)
    }

}
