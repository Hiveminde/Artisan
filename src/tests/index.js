import User from '../examples/models/User'
import NOOP from '../lib/adapters/NOOP'
// import HTTPAdapter from '../lib/adapters/HTTPAdapter'
User.adapter = new NOOP({ klass: 'User' })

const suite = async (name, exec) => {
    console.log('Suite: ', name)
    return await exec()
}

const describe = async (name, exec) => {
    console.log(name)
    return await exec()
}

const assert = val1 => ({equals: val2 => {
    if (val1 !== val2)
        throw new Error(`Assert: expected value '${val1}' to equal '${val2}'`)
    else return console.log('Passed!')
}})

const testUser = () => ({ username: 'test_user', email: 'user@test.com' })


suite('User', async () => {

    describe('<#User>.create', async () => {
        const user = new User(testUser())
        await user.create()
        assert(user.username).equals('test_user')
    })


    describe('User.create', async () => {
        const users = await User.create([testUser()])
        assert(users[0].username).equals('test_user')
    })


    describe('<#User>.read', async () => {
        const user = new User(testUser())
        await user.read()
        assert(user.username).equals('test_user')
    })


    describe('User.read', async () => {
        const users = await User.read([testUser()])
        assert(users[0].username).equals('test_user')
    })


    describe('<#User>.update', async () => {
        const user = new User(testUser())
        await user.update({ username: 'user' })
        assert(user.username).equals('user')
    })


    describe('User.update', async () => {
        const users = await User.update([testUser()], [{ username: 'user' }])
        assert(users[0].username).equals('user')
    })


    describe('<#User>.destroy', async () => {
        const user = new User(testUser())
        assert(await user.destroy()).equals(true)
    })


    describe('User.destroy', async () => {
        const confirmations = await User.destroy([testUser()])
        assert(confirmations[0]).equals(true)
    })

})