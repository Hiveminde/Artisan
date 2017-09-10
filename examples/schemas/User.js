import Artisan from 'Artisan'
import Comment from './Comment'

export class User extends Artisan {

    constructor(attrs) {
        super({
            adapters: {
                client: 'Socket',
                server: 'Mongo'
            },
            schema: {
                username: Artisan.types.String,
                email: Artisan.types.String
            }
        })

        Object.assign(this, attrs)

        this.hasMany(Comment)
    }

    addFriend(user) {
        this.update({friends: {$push: user}})
    }

}
