class Artisan {

    static get types() {
        return {
            String: String,
            Boolean: Boolean
        }
    }

    static environment() {
        return (
            typeof window !== 'undefined' ?
                'CLIENT' :
            (typeof process !== 'undefined' ?
                'SERVER'
            :
                'UNKOWN'
            )
        )
    }



    constructor(config) {
        if (!this.constructor.adapter) {
            let adapter = require(`./adapters/${config.adapters[Artisan.environment().toLowerCase()]}`)
            this.constructor.adapter = new adapter({
                klass: this.constructor.name
            })
        }
    }



    async create() {
        if (this.beforeCreate) {
            await this.beforeCreate()
        }

        let instances = await this.constructor.create([this])

        if (this.afterCreate) {
            await this.afterCreate()
        }

        Object.assign(this, instances[0])
    }

    static async create(writeData) {
        let instances = writeData.map((data) => data.constructor === this ? data : new this(data))

        // Static before hook
        if (this.beforeCreate) {
            await this.beforeCreate(instances)
        }

        // Make adapter call
        let outputData = await this.adapter.create(instances)

        instances = outputData.map((data) => new this(data))

        // Static after hook
        if (this.afterCreate) {
            await this.afterCreate(instances)
        }

        return instances
    }



    async read() {
        if (this.beforeRead) {
            await this.beforeRead()
        }

        let instances = await this.constructor.read([this])

        if (this.afterRead) {
            await this.afterRead()
        }

        Object.assign(this, instances[0])
    }

    static async read(queryData) {
        let instances = queryData.map((data) => data.constructor === this ? data : new this(data))

        // Static before hook
        if (this.beforeRead) {
            await this.beforeRead(instances)
        }

        // Make adapter call
        let outputData = await this.adapter.read(instances)

        instances = outputData.map((data) => new this(data))

        // Static after hook
        if (this.afterRead) {
            await this.afterRead(instances)
        }

        return instances
    }



    async update(writeData) {
        if (this.beforeUpdate) {
            await this.beforeUpdate(writeData)
        }

        let instances = await this.constructor.update([this], [writeData])

        if (this.afterUpdate) {
            await this.afterUpdate()
        }

        Object.assign(this, instances[0])
    }

    static async update(queryData, writeData) {
        let instances = queryData.map((data) => data.constructor === this ? data : new this(data))

        // Static before hook
        if (this.beforeUpdate) {
            await this.beforeUpdate(instances)
        }

        // Make adapter call
        let outputData = await this.adapter.update(instances, writeData)

        instances = outputData.map((data) => new this(data))

        // Static after hook
        if (this.afterUpdate) {
            await this.afterUpdate(instances)
        }

        return instances
    }



    async destroy() {
        if (this.beforeDestroy) {
            await this.beforeDestroy()
        }

        let instances = await this.constructor.destroy([this])

        if (this.afterDestroy) {
            await this.afterDestroy()
        }

        Object.assign(this, instances[0])
    }

    static async destroy(queryData) {
        let instances = queryData.map((data) => data.constructor === this ? data : new this(data))

        // Static before hook
        if (this.beforeDestroy) {
            await this.beforeDestroy(instances)
        }

        // Make adapter call
        let outputData = await this.adapter.destroy(instances)

        instances = outputData.map((data) => new this(data))

        // Static after hook
        if (this.afterDestroy) {
            await this.afterDestroy(instances)
        }

        return instances
    }

}


if (Artisan.environment() === 'SERVER') {
    module.exports = Artisan
} else {
    window.Artisan = Artisan
}