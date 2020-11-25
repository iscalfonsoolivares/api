const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    login: {
        type: String,
        required: [true, 'the login is required']
    },
    app: {
        type: String,
        required: [true, 'the app is required']
    },
    role: {
        type: String,
        required: [true, 'the role is required']
    },
    password: {
        type: String,
        required: [true, 'the password is required']
    }
});

userSchema.method('validPassword', async function(password){

    try {

        if( await bcrypt.compare(password, this.password) ){
            return true;
        }else{
            return false;
        }

    } catch (error) {
        throw new Error(error);
    }

});

mongoose.model('users', userSchema);
