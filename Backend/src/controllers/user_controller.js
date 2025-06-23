import { User } from "../models/user_model.js";
import httpStatus from 'http-status';
import { createSecretToken } from "../utils/secretToken.js";
import bcrypt from 'bcrypt';


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || ! password){
            return res.json({message:"All fields required", success:false})
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(httpStatus.FOUND).json({ message: "User already exist" });
        }

        const user = await User.create({ name, email, password });
        const token = createSecretToken(user.id);
        res.status(httpStatus.CREATED).json({ message: "User registered in successfully", success: true, user, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: "All fields are empty", success:false });
        }
        const user = await User.findOne({ email });
        if(user === null){
            return res.json({message:"User not exist",success:false})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ message: "email or password incorrect", success:false});
        }
        const token = createSecretToken(user._id);
        res.status(httpStatus.OK).json({ message: "User successfully Logged in", user, success: true, token });
    } catch (error) {
        console.log("hell")
        res.status(500).json({ error: error.message });
    }
}

const getUserProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
        }
        res.status(httpStatus.OK).json({ message: "User founded", user, success: true });

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(req.params.id);
    }
}


const updateProfile = async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.user);
        const id = req.params.id;
        if (id !== req.user.id) {
            return res.status(httpStatus.FORBIDDEN).json({ message: "not acceptabel", success: false });
        }
        const update = req.body;
        // update.password = await bcrypt.hash(update.password, 12);
        const updatedUser = await User.findByIdAndUpdate(id,update,{new:true});
        console.log(updatedUser)
        res.status(httpStatus.CREATED).json({ message: "Profile updated succefully", success: true, updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error)
    }
}

export { register, login, getUserProfile, updateProfile };