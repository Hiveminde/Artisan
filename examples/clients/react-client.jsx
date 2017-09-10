import React from 'react'
import User from './User'

class UsersNode extends React.Component {

    constructor() {
        super()
    }

    async componentDidMount() {
        this.setState({users: await User.findAll()})
    }

    render() {
        return (
            <div>
                {this.users.map(user =>
                    <UserNode user={user} />
                )}
            </div>
        )
    }
}

class UserNode extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    async onSubmit() {
        try {
            await this.state.user.save()
        } catch (error) {
            // If beforeSave() validations fail
            this.state.error = error
        }
    }

    onChange(e, k) {
        this.setState(Object.assign({
            user: {
                [k]: e.target.value
            }
        }, this.state))
    }

    async addFriend(user) {
        try {
            await this.state.user.addFriend(user)
        } catch (e) {
            this.state.error = e
        }
    }

    async render() {
        return (
            <form onSubmit={() => await this.onSubmit()}>
                <span>User:</span>
                <Error message={this.state.error)}/>
                {Object.keys(this.state.user).map(k =>
                    <div>
                        <label for={k}>{k.toUpperCase()}</label>
                        <input type="text" name={k} value={this.state.user[k]} onChange={(e) => this.onChange(e, k)}/>
                        <button onClick={()=> await this.addFriend(user)}></button>
                    </div>
                )}
            </form>
        )
    }
}

ReactDOM.render(
    <UsersNode />,
    document.getElementById('root')
)
