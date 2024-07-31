
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import errorHandler from '../utils/error.js'

const registerUser = async (req, res,next) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return next.errorHandler({ message: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password: await bcrypt.hash(password, 10),
        });

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
        res
        .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
        .status(201)
        .json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
        });
    } catch (error) {
        next({ message: 'Server error' });
    }
};

const loginUser = async (req, res,next) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return next(errorHandler('User Not Found'))
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return next(errorHandler('Invalid Credentials'))
        }
        
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
        res
        .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
        .json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
        });
    } catch (error) {
        next({ message: 'Server error' });
    }
};

const logout = (req, res) => {
    res.clearCookie('access_token').status(200).json('Logout success!');
  };

export {logout , loginUser , registerUser}