export class Artisan {

    static get types() {
        return {
            String: String
        }
    }

    static environment() {
        return (window ? 'CLIENT' : (process ? 'SERVER' : 'UNKOWN'))
    }



    constructor(config) {
        this.constructor.adapter = (
            this.constructor.adapter ||
            new require(`adapters/${config.adapters[Artisan.environment().toLowerCase()]}`)({
                klass: this.constructor.name
            })
        )
    }


    async create(data) {
        if (this.beforeCreate) {
            await this.beforeCreate(data)
        }

        let instanceData = await this.constructor.adapter.create(data)

        if (this.afterCreate) {
            await this.afterCreate(instanceData)
        }

        return instanceData
    }


    async read(query) {
        if (this.beforeRead) {
            await this.beforeRead(query)
        }

        let instanceData = await this.constructor.adapter.read(query)

        if (this.afterRead) {
            await this.afterRead(instanceData)
        }

        return instanceData
    }


    async update(query, data) {
        if (this.beforeUpdate) {
            await this.beforeUpdate(query, data)
        }

        let instanceData = await this.constructor.adapter.update(query, data)

        if (this.afterUpdate) {
            await this.afterUpdate(instanceData)
        }

        return instanceData
    }


    async delete(query) {
        if (this.beforeDelete) {
            await this.beforeDelete(query)
        }

        let instanceData = await this.constructor.adapter.delete(query)

        if (this.afterDelete) {
            await this.afterDelete(instanceData)
        }
        // This may be empty depending on adapter
        return instanceData
    }

}