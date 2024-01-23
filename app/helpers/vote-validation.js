const Vote = require('../models/vote-model')

const voteValidationSchema = {
    option : {
        in : ['body'],
        notEmpty : {
            errorMessage : 'option is required'
        },
        isMongoId : {
            errorMessage : 'should be valid id'
        }
    },
    pollId : {
        in : ['params'],
        notEmpty : {
            errorMessage : 'Pollid is required'
        },
        isMongoId : {
            errorMessage : 'should b valid Id'
        }
    },
    user : {
        custom : {
            options : async(value,{req}) => {
                const vote = await Vote.findOne({ user: req.user.id, poll: req.params.pollId })
                if(vote){
                    throw new Error('You have already casted your vote')
                } else {
                    return true
                }
            }
        }
    }
}

module.exports = voteValidationSchema