import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin:{type: Boolean, default: false}
});

userSchema.pre("save", async function(){

    this.password = await bcrypt.hash(this.password, 12)
   
});

const User = mongoose.model('User', userSchema);

export {User};