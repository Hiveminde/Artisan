(async () => {

    const User = require('../examples/models/User')
    await User.config({
        adapter: require('../src/lib/adapters/NOOP')
    })



    console.log('<----- BEGIN TESTS ----->')

    await (async () => {
        let joe = new User({ username: 'twincharged', email: 'joe@hiveminde.com' })
        await joe.create()
        console.log('<User>.create --result-->', joe.username === 'twincharged')

        let users = await User.create([{ username: 'twincharged', email: 'joe@hiveminde.com' }])
        console.log('User.create --result-->', users[0].username === 'twincharged')
    })()



    await (async () => {
        let joe = new User({ username: 'twincharged', email: 'joe@hiveminde.com' })
        await joe.read()
        console.log('<User>.read --result-->', joe.username === 'twincharged')

        let users = await User.read([{ username: 'twincharged', email: 'joe@hiveminde.com' }])
        console.log('User.read --result-->', users[0].username === 'twincharged')
    })()



    await (async () => {
        let joe = new User({ username: 'twincharged', email: 'joe@hiveminde.com' })
        await joe.update({ username: 'joe' })
        console.log('<User>.update --result-->', joe.username === 'joe')

        let users = await User.update([{ username: 'twincharged', email: 'joe@hiveminde.com' }], [{ username: 'joe' }])
        console.log('User.update --result-->', users[0].username === 'joe')
    })()



    await (async () => {
        let joe = new User({ username: 'twincharged', email: 'joe@hiveminde.com' })
        await joe.destroy()
        console.log('<User>.destroy --result-->', joe.username === 'twincharged')

        let users = await User.destroy([{ username: 'twincharged', email: 'joe@hiveminde.com' }])
        console.log('User.destroy --result-->', users[0].username === 'twincharged')
    })()



    await (async () => {
        let joe = new User({ username: 'twincharged', email: 'an invalid email' })
        try {
            await joe.create()
        } catch (error) {
            console.log('<User>.beforeCreate --result-->', error.message === User.messages.invalidEmail)
        }
    })()

    console.log('<----- END TESTS ----->')

})()