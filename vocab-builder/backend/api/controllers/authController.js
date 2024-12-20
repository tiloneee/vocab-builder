import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import bcrypt from "bcryptjs";

const generateToken = (user) => { 
    const accessToken = jwt.sign(
        { id: user._id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return accessToken;
}

export const checkToken = async (req, res) => { 
    res.status(200).json({ message: 'Pong' });
}

export const login = async (req, res) => { 
    try {
    const {email, password} = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Email or Password is incorrect' });

    const accessToken = generateToken(user);

    const outputJson = {
        message: "Login Success",
        accessToken: accessToken,
        id: user._id,
        name: user.name,
        email: user.email
    }

    res.status(200).json(outputJson);
} catch (error) {
    res.status(500).json({ error: error.message });
}
}

export const register = async (req, res) => { 
    try { 
        console.log("Request body: ", req.body)
        const userExisted = await User.findOne({ email : req.body.email })
        if (userExisted) {
            return res.status(409).json({
                message : `User with username ${req.body.email} existed`
            })
        }
        const newUser = new User(req.body);
       
        await newUser.save();
        res.status(201).json({
            message : `User with username ${req.body.email} created`
        });
    } catch (error) {
        res.status(500).send(error);
}};








