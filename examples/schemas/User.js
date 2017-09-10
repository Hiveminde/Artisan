import Artisan from 'Artisan'
import Comment from './Comment'

export class User extends Artisan {

    constructor(attrs) {
        super({
            adapters: [
                'WebSocketAdapter',
                'MongoAdapter'
            ],
            schema: {
                username: Artisan.String,
                email: Artisan.String
            }
        })

        Object.assign(this, attrs)

        this.hasMany(Comment)
    }

    addFriend(user) {
        this.update({friends: {$push: user}})
    }

}
