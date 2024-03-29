const User = require('../models/user-model')

const usernameSchema = {
        notEmpty : {
            errorMessage : 'username is required'
        }
}

const emailRegisterSchema = {
    notEmpty : {
        errorMessage : 'email is required'
    },
    isEmail : {
        errorMessage : 'invalid email format'
    },
    custom : {
        options : async(value) => {
            const user = await User.findOne({email: value })
            if(user){
                throw new Error('user record already exists ')
            } else {
                return true
            }
        } 
    }
}

const emailLoginSchema = {
    notEmpty :{
        errorMessage : 'email is required'
    },
    isEmail : {
        errorMessage : 'invalid email'
    }
}

const passwordSchema = {
    notEmpty : {
        errorMessage : 'password is required'
    },
    isLength : {
        options : {min:8, max:128},
        errorMessage : 'password should be between 8 - 128 characters'
        
    }
}


const userRegisterSchema = {
    username : usernameSchema ,
    email : emailRegisterSchema ,
    password : passwordSchema
}

const userLoginSchema = {
    email : emailLoginSchema,
    password : passwordSchema
}

module.exports = {
    userRegisterSchema,
    userLoginSchema
}