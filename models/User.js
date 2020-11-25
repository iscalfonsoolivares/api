const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'the user name is required']
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
