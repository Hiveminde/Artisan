const User = require('../examples/models/User');


(async () => {

    console.log('<----- BEGIN TESTS ----->')

    await (async () => {
        let joe;
        let users;

        joe = new User({ username: 'twincharged', email: 'joe@hiveminde.com' })
        await joe.create()
        console.log('<User>.create --result-->', joe.username === 'twincharged')

        users = await User.create([{ username: 'twincharged', email: 'joe@hiveminde.com' }])
        console.log('User.create --result-->', users[0].username === 'twincharged')
    })()



    await (async () => {
        let joe;
        let users;

        joe = new User({ username: 'twincharged', email: 'joe@hiveminde.com' })
        await joe.read()
        console.log('<User>.read --result-->', joe.username === 'twincharged')

        users = await User.read([{ username: 'twincharged', email: 'joe@hiveminde.com' }])
        console.log('User.read --result-->', users[0].username === 'twincharged')
    })()



    await (async () => {
        let joe;
        let users;

        joe = new User({ username: 'twincharged', email: 'joe@hiveminde.com' })
        await joe.update({ username: 'joe' })
        console.log('<User>.update --result-->', joe.username === 'joe')

        users = await User.update([{ username: 'twincharged', email: 'joe@hiveminde.com' }], [{ username: 'joe' }])
        console.log('User.update --result-->', users[0].username === 'joe')
    })()



    await (async () => {
        let joe;
        let users;

        joe = new User({ username: 'twincharged', email: 'joe@hiveminde.com' })
        await joe.delete()
        console.log('<User>.delete --result-->', joe.username === 'twincharged')

        users = await User.delete([{ username: 'twincharged', email: 'joe@hiveminde.com' }])
        console.log('User.delete --result-->', users[0].username === 'twincharged')
    })()

    console.log('<----- END TESTS ----->')

})()