import jwt from 'jsonwebtoken';
import User from '../models/authModel.js';

const generateToken = (user) => { 
    const accessToken = jwt.sign(
        { id: user._id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return accessToken;
}

export const login = async (req, res) => { 
    try {
    const {email, password} = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Email or Password is incorrect' });

    const accessToken = generateToken(user);

    console.log("Logged user", user)
    const outputJson = {
        message: "Login Success",
        accessToken: accessToken,
        name: user.name,
        email: user.email
    }

    res.status(200).json(outputJson);
} catch (error) {
    res.status(500).json({ error: error.message });
}
}

export const list_all_users = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }}

export const create_user = async (req, res) => { 
    try { 
        console.log("Request body: ", req.body)
        const userExisted = await User.findOne({ email : req.body.email })
        if (userExisted) {
            return res.status(409).json({
                message : `User with username ${req.body.email} existed`
            })
        }
        const newUser = new User(req.body);
        console.log("123");
        
        await newUser.save();
        res.status(201).json({
            message : `User with username ${req.body.email} created`
        });
        console.log("New user created: ", newUser)
    } catch (error) {
        res.status(500).send(error);
}};

export const delete_user = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) {
            res.status(400).send("No user");   
        }
        res.status(200).json(user);
    } catch {
        res.status(500).send(error);
    }
}

export const update_user = async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(req.params.userId, req.body, { new: true });
        if (!updatedUser) {
            res.status(400).send("No user");
        }
        res.status(200).json(updatedUser);
    } catch { 
        res.status(500).json({ error: error.message });
    }}


    export const logout = async (req, res) => {
        
    }
