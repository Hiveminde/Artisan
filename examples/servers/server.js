import express from 'express'
import User from './User'
let app = express()
let port = process.env.PORT || 5000

app.use(express.logger())

app.get('/users', async (req, res, next) => {
    res.body = await User.findAll()
    res.send()
})

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
