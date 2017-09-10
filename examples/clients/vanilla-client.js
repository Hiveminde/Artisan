import User from './User'


async function showAllUserComments() {
    let usersDiv = document.querySelector('#users')
    let users = await User.findAll()
    users.forEach(async (user) => {
        let comments = await user.comments()
        usersDiv.innerHTML += (`
            <div class='comments'>
                ${user.username} said ${comments.map((c) => c.body).join(', ')}
            </div>
        `)
    })
}


showAllUserComments()
