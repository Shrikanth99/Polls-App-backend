const mongoose = require('mongoose')
const {Schema, model} = mongoose

const voteSchema = new Schema({
    user: {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    poll : {
        type : Schema.Types.ObjectId,
        ref : 'Poll'
    },
    option : Schema.Types.ObjectId,
    voteDate : Date
})

const Vote = model('Votes', voteSchema )

module.exports = Vote