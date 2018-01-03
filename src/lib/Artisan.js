import { isDefined, formatAsArray } from './Utils'
import Validator from './Validator'


export default class Artisan {

    static get schema() {
        return {}
    }

    constructor(data = {}) {
        const schema = this.constructor.schema
        const defaultValues = {}
        Object.keys(schema).map(prop => Object.assign(defaultValues, { [prop]: schema[prop].default }))
        Object.assign(this, defaultValues, data)
        // TODO: Create getters and setters on schema properties with
        // attrs such as {
        //     primaryKey: Boolean,
        //     default: value,
        //     private: Boolean,
        //     // validator: Function(value),
        //     value: value,
        //     enumerable: Boolean,
        //     writable: Boolean,
        //     configurable: Boolean,
        //     set: Function,
        //     get: Function
        // }
        // Add instance immutability
        // if (schema.immutable) {
        //     Object.freeze(this)
        // }
    }

    clone() {
        return Object.assign(new this.constructor(), this)
    }

    static _getInstance(obj) {
        const instance = obj.constructor === this ? obj : new this(obj)
        // return this.schema.immutable ? instance.clone() : instance
        return instance
    }

    async create() {
        const instance = this.constructor._getInstance(this)
        new Validator(instance.constructor.schema, instance)

        if (instance.beforeCreate) {
            await instance.beforeCreate()
        }

        const instances = await instance.constructor.create([instance])

        if (instance.afterCreate) {
            await instance.afterCreate()
        }

        Object.assign(instance, instances[0])
        return instance
    }

    static async create(writeData = []) {
        const dataArray = formatAsArray(writeData)
        const instances = dataArray.map(data => this._getInstance(data))

        instances.forEach(instance => new Validator(this.schema, instance))

        // Static before hook
        if (this.beforeCreate) {
            await this.beforeCreate(instances)
        }

        // Make adapter call
        const outputData = await this.adapter.create(instances)

        const outstances = outputData.map(data => new this(data))

        // Static after hook
        if (this.afterCreate) {
            await this.afterCreate(outstances)
        }

        return outstances
    }

    async read() {
        if (this.beforeRead) {
            await this.beforeRead()
        }

        const instances = await this.constructor.read([this])

        if (this.afterRead) {
            await this.afterRead()
        }

        Object.assign(this, instances[0])
        return this
    }

    static async read(queryData = []) {
        const dataArray = formatAsArray(queryData)
        const instances = dataArray.map(data => (data.constructor === this ? data : new this(data)))

        // Static before hook
        if (this.beforeRead) {
            await this.beforeRead(instances)
        }

        // Make adapter call
        const outputData = await this.adapter.read(instances)

        const outstances = outputData.map(data => new this(data))

        // Static after hook
        if (this.afterRead) {
            await this.afterRead(outstances)
        }

        return outstances
    }

    async update(writeData = []) {
        if (this.beforeUpdate) {
            await this.beforeUpdate(writeData)
        }

        const instances = await this.constructor.update([this], [writeData])

        if (this.afterUpdate) {
            await this.afterUpdate()
        }

        Object.assign(this, instances[0])
        return this
    }

    static async update(queryData = [], writeData = []) {
        const dataArray = formatAsArray(queryData)
        const instances = dataArray.map(data => (data.constructor === this ? data : new this(data)))

        // Static before hook
        if (this.beforeUpdate) {
            await this.beforeUpdate(instances)
        }

        // Make adapter call
        const outputData = await this.adapter.update(instances, formatAsArray(writeData))

        const outstances = outputData.map(data => new this(data))

        // Static after hook
        if (this.afterUpdate) {
            await this.afterUpdate(outstances)
        }

        return outstances
    }

    async destroy() {
        if (this.beforeDestroy) {
            await this.beforeDestroy()
        }

        const confirmation = (await this.constructor.destroy([this]))[0]

        if (this.afterDestroy) {
            await this.afterDestroy(confirmation)
        }

        return confirmation
    }

    static async destroy(queryData = []) {
        const dataArray = formatAsArray(queryData)
        const instances = dataArray.map(data => (data.constructor === this ? data : new this(data)))

        // Static before hook
        if (this.beforeDestroy) {
            await this.beforeDestroy(instances)
        }

        // Make adapter call
        const confirmationArray = await this.adapter.destroy(instances)

        // Static after hook
        if (this.afterDestroy) {
            await this.afterDestroy(confirmationArray)
        }

        return confirmationArray
    }
}