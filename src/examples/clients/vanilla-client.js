import User from '../models/User'


async function showAllUserComments() {
    let usersDiv = document.querySelector('#users')
    // Gets list of all users
    let users = await User.read()
    users.forEach(async (user) => {
        // Gets each user's comment list
        let comments = await user.comments()
        usersDiv.innerHTML += (`
            <div class='comments'>
                ${user.username} said ${comments.map((c) => c.body).join(', ')}
            </div>
        `)
    })
}


showAllUserComments()
