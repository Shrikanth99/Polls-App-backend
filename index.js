require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {checkSchema} = require('express-validator')
const configureDB = require('./config/db')

const {authenticateUser} = require('./app/middlewares/authentication')
const { userRegisterSchema, userLoginSchema } = require('./app/helpers/user-validation')
const categoryValidationSchema = require('./app/helpers/category-validation')
const pollValidationSchema = require('./app/helpers/poll-validation')


const usersCltr = require('./app/controller/users-cltr')
const categoryCltr = require('./app/controller/category-cltr')
const pollsCltr = require('./app/controller/polls-cltr')
const votesCltr = require('./app/controller/votes-cltr')
const voteValidationSchema = require('./app/helpers/vote-validation')

const port = 3090
const app = express()

app.use(express.json())
app.use(cors())

configureDB()

app.post('/auth/register', checkSchema(userRegisterSchema), usersCltr.register )
app.post('/auth/login', checkSchema(userLoginSchema), usersCltr.login)
app.get('/api/users/account', authenticateUser, usersCltr.account)

// cat
app.get('/api/categories',categoryCltr.list)
app.get('/api/polls/category/:name', pollsCltr.categories )
app.post('/api/categories', authenticateUser, checkSchema(categoryValidationSchema), categoryCltr.create )

// polls
app.get('/api/polls/mypolls', authenticateUser, pollsCltr.myPolls)
app.get('/api/polls/active' , pollsCltr.active )
app.post('/api/polls', authenticateUser, checkSchema(pollValidationSchema), pollsCltr.create) 

// votes 
app.get('/api/votes/myvotes', authenticateUser, votesCltr.myVotes)
app.post ('/api/polls/vote/:pollId', authenticateUser, checkSchema(voteValidationSchema) ,votesCltr.create )




app.listen(port , () => {
    console.log('server running on port', port )
})