import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// import refresh from "../controllers/authController.js";

const userSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false,
        default: "/uploads/avatars/default-profile-image.png"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
{ collection: "user"});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);