import express from 'express'
import Artisan from 'Artisan'
import models from './models/*'
import User from '../models/User'
import Blog from '../models/Blog'
import Comment from '../models/Comment'

let app = express()
let port = process.env.PORT || 5000

app.use(express.logger())

// Automatic endpoint creation
app.use(Artisan.endpoint(models))


// Manual usage
app.get('/User', async (req, res, next) => {
    res.body = await User.read(req.query)
    res.send()
}).post('/User', async (req, res, next) => {
    res.body = await User.create(req.body)
    res.send()
}).put('/User', async (req, res, next) => {
    res.body = await User.update(req.query, req.body)
    res.send()
}).delete('/User', async (req, res, next) => {
    res.body = await User.destroy(req.query)
    res.send()
})


// Custom endpoint
app.get('/endpoints/contrived/users-blogs-comments', async (req, res, next) => {
    res.body = {
        user: await User.read(),
        blogs: await Blog.read(),
        comments: await Comment.read()
    }
    res.send()
})


app.listen(port, () => {
    console.log(`Listening on ${port}`)
})
