try {
    Artisan = require('../../src/lib/Artisan')
} catch (error) {
    console.info(error.toString())
}



class User extends Artisan {

    constructor(attrs) {
        super(attrs)
    }

    static schema() {
        return {
            username: Artisan.types.String,
            email: Artisan.types.String
        }
    }

    beforeCreate() {
        if (!this.email.match(/@{1}/g)) {
            throw new Error(User.messages.invalidEmail)
        }
    }

}

User.messages = {
    invalidEmail: 'Please enter a valid email address.'
}


if (Artisan.environment() === 'SERVER') {
    module.exports = User
} else {
    window.User = User
}