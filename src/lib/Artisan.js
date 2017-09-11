module.exports = class Artisan {

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
            : 'UNKOWN')
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
        let instance = await this.constructor.create(this)
        Object.assign(this, instance)
    }

    static async create(data) {
        let instance = data.constructor === this ? data : new this(data)
        if (instance.beforeCreate) {
            await instance.beforeCreate()
        }

        instance = new this(await this.adapter.create(data))

        if (instance.afterCreate) {
            await instance.afterCreate()
        }

        return instance
    }



    async read() {
        let instance = await this.constructor.read(this)
        Object.assign(this, instance)
    }
    
    static async read(query) {
        let instance = query.constructor === this ? query : new this(query)
        if (instance.beforeRead) {
            await instance.beforeRead()
        }

        instance = new this(await this.adapter.read(query))

        if (instance.afterRead) {
            await instance.afterRead()
        }

        return instance
    }



    async update(data) {
        let instance = await this.constructor.update(this, data)
        Object.assign(this, instance)
    }

    static async update(query, data) {
        let instance = query.constructor === this ? query : new this(query)
        if (instance.beforeUpdate) {
            await instance.beforeUpdate(data)
        }

        instance = new this(await this.adapter.update(instance, data))
        
        if (instance.afterUpdate) {
            await instance.afterUpdate()
        }

        return instance
    }



    async delete() {
        return await this.constructor.delete(this)
    }

    static async delete(query) {
        let instance = query.constructor === this ? query : new this(query)
        if (instance.beforeDelete) {
            await instance.beforeDelete()
        }

        instance = new this(await this.adapter.delete(instance))

        if (instance.afterDelete) {
            await instance.afterDelete()
        }
        // should this return boolean from adapter?
        return instance
    }

}