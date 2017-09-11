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

(async () => {
    let joe = new User({ username: 'twincharged', email: 'joe@hiveminde.com' })
    await joe.create({ username: 'joe' })
    console.log('<User>.create', joe)

    joe = await User.create({ username: 'twincharged', email: 'joe@hiveminde.com' })
    console.log('User.create', joe)



    joe = new User({ username: 'twincharged', email: 'joe@hiveminde.com' })
    await joe.read()
    console.log('<User>.read', joe)

    joe = await User.read({ username: 'twincharged', email: 'joe@hiveminde.com' })
    console.log('User.read', joe)



    joe = new User({ username: 'twincharged', email: 'joe@hiveminde.com' })
    await joe.update({ username: 'joe' })
    console.log('<User>.update', joe)

    joe = await User.update({ username: 'twincharged', email: 'joe@hiveminde.com' }, {username: 'joe'})
    console.log('User.update', joe)



    joe = new User({ username: 'twincharged', email: 'joe@hiveminde.com' })
    await joe.delete()
    console.log('<User>.delete', joe)

    joe = await User.delete({ username: 'twincharged', email: 'joe@hiveminde.com' })
    console.log('User.delete', joe)

})()