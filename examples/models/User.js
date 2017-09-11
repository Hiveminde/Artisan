const Artisan = require('../../src/lib/Artisan')

class User extends Artisan {

    constructor(attrs) {
        super({
            adapters: {
                client: 'HTTP',
                server: 'NOOP'
            },
            schema: {
                username: Artisan.types.String,
                email: Artisan.types.String
            }
        })

        Object.assign(this, attrs)
    }

    beforeCreate() {
        if (!this.email.match(/@{1}/g)) {
            throw new Error('Please enter valid email address')
        }
    }

}

module.exports = User