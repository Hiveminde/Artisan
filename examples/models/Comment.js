import Artisan from 'Artisan'
import User from './User'
import WebSocketAdapter from 'WebSocketAdapter'
import MongoAdapter from 'MongoAdapter'

export class Comment extends Artisan {

    constructor(attrs) {
        super({
            adapters: [
                WebSocketAdapter,
                MongoAdapter
            ],
            schema: {
                title: Artisan.String,
                body: Artisan.String
            }
        })
        
        Object.assign(this, attrs)

        this.belongsTo(User)
    }

}
