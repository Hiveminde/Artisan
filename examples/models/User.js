import Artisan from 'Artisan'
import Comment from './Comment'

export class User extends Artisan {

    constructor(attrs) {
        super({
            adapters: {
                client: 'HTTP',
                server: 'Mongo'
            },
            schema: {
                username: Artisan.types.String,
                email: Artisan.types.String
            },
            comments: {
                hasMany: Comment
            }
        })

        Object.assign(this, attrs)
    }

    beforeCreate() {
        if (!this.email.match(/@{1}/g)) {
            throw new Error('Please enter valid email address')
        }
    }

    addFriend(user) {
        this.update({friends: {$push: user}})
    }

}