try {
    Artisan = require('../../src/lib/Artisan')
} catch (error) {
    console.error(error.toString())
}

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


if (Artisan.environment() === 'SERVER') {
    module.exports = User
} else {
    window.User = User
}