export class Artisan {

    constructor(config) {
        this.klass = config.klass
        if (window) {
            if (config.adapters.indexOf('WebSocketAdapter') >= 0) {
                // TODO: Unfortunately, this would be required on every User instance init
                this.adapter = new require('WebSocketAdapter')()
            }
        }
    }

    async create(data) {
        if (this.beforeCreate) {
            await this.beforeCreate(data)
        }

        let instanceData = await this.adapter.create(this.klass, data)

        if (this.afterCreate) {
            await this.afterCreate(instanceData)
        }

        return instanceData
    }
    
    
    async read(query) {
        if (this.beforeRead) {
            await this.beforeRead(query)
        }

        let instanceData = await this.adapter.read(this.klass, query)

        if (this.afterRead) {
            await this.afterRead(instanceData)
        }

        return instanceData
    }
    
    async update(query, data) {
        if (this.beforeUpdate) {
            await this.beforeUpdate(query)
        }

        let instanceData = await this.adapter.update(this.klass, query, data)

        if (this.afterUpdate) {
            await this.afterUpdate(instanceData)
        }

        return instanceData
    }
    
    
    async delete(query) {
        if (this.beforeDelete) {
            await this.beforeDelete(query)
        }

        let instanceData = await this.adapter.delete(this.klass, query)

        if (this.afterDelete) {
            await this.afterDelete(instanceData)
        }
        // This may be empty depending on adapter
        return instanceData
    }

}
