import Artisan from '../../lib/Artisan'

export default class User extends Artisan {

    static get schema() {
        return {
            id: {
                type: String,
                primaryKey: true,
                writable: false,
                configurable: false
            },
            username: {
                type: String,
                required: true
            },
            email: {
                type: String,
                default: ''
            }
        }
    }

    beforeCreate() {
        if (!this.email.match(/@{1}/g)) {
            throw new Error('Please enter valid email address')
        }
    }

}

// TODO: implement 'strict' and 'immutable' properties on schema
// Putting said props on schema would either only directly affect
// the schema (and would therefore have to place them on the sub
// objects as well), or they would make the schema deep strict
// and deep immutable.
// Immutable: Object.freeze()
// Strict: throw error if non-schema attr is added to the object,
// which may need a proxy object

// const _schema = {
//     type: Function, // constructor,
//     primaryKey: Boolean,
//     default: value,
//     required: Boolean,
//     private: Boolean,
//     // validator: Function(value),

//     value: value,
//     enumerable: Boolean,
//     writable: Boolean,
//     configurable: Boolean,
//     set: Function,
//     get: Function
// }

// Schema should likely be scoped to the instance because
// it should have the flexibility to vary between instances
// e.g. Setters/getters on certain schema properties should
// have access to the instance without an implicit function
// bind.


// TODO: subclassing:
// class SuperUser extends User {
//     get schema() {
//         // Artisan.extend will deep clone.
//         // This is necessary over Object.assign
//         // because we cannot assume from where
//         // the programmer is finding schema (or
//         // its sub-objects) to extend
//         return Artisan.extend(this.schema, {
//             isSuperUser: {
//                 type: Boolean,
//                 writable: true,
//                 enumerable: false,
//                 configurable: true, 
//                 default: 'Y'
//             }
//         })
//     }
// }

