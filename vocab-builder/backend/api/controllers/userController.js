import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';


export const list_all_users = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const read_user = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const update_user = async (req, res) => {
    try {
        const { password, currentPassword, ...updateData } = req.body;
        if (password) {
            if (!currentPassword) {
                return res.status(400).send("Current password is required");
            }
            const user = await User.findById(req.params.userId);
            const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
            if (!isPasswordValid) {
                return res.status(400).send("Current password is incorrect");
            }
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.userId }, // Filter
            updateData, // Update data
            { new: true } // Return the updated document
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).send("User not found");
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
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

export const uploadAvatar = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user's avatar
        user.avatar = `/uploads/avatars/${req.file.filename}`;
        await user.save();

        res.json({ message: 'Avatar uploaded successfully', avatar: user.avatar });
    } catch (error) {
        console.error('Error uploading avatar:', error);
        res.status(500).json({ message: 'Failed to upload avatar', error });
    }
};