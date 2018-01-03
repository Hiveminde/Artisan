import {isDefined} from './Utils'

const validators = {
    required: (configValue, data, key) => {
        if (configValue === true && !isDefined(data[key])) {
            throw new Error(`RequiredError: Property '${key}' is required.`)
        }
    },
    type: (configValue, data, key) => {
        if (configValue !== 'any' && isDefined(data[key]) && data[key].constructor !== configValue) {
            throw new Error(`TypeError: Expected property '${key}' constructor to be ${configValue.name}, but received ${configValue.constructor.name}.`)
        }
    }
}



const defaultPropConfig = {
    required: false,
    type: 'any'
}

const excludedProps = {
    default: undefined
}

const validateDataProp = (schema, data, key) => {    
    const configs = Object.assign({}, defaultPropConfig, schema[key], excludedProps)

    for (const configKey in configs) {
        if (configs.hasOwnProperty(configKey) && isDefined(configs[configKey]) && validators[configKey]) {
            validators[configKey](configs[configKey], data, key)
        }
    }
}

export default (schema = {}, data = {}) => {
    for (const key in schema) {
        if (schema.hasOwnProperty(key)) {
            validateDataProp(schema, data, key)
        }
    }
}
