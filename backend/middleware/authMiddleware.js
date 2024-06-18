import asyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken';
import { User } from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;
    if (token) {
        try {
            let decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(400);
            throw new Error('Invalid Token - Unauthorized User');
        }
    } else {
        res.status(400);
        throw new Error('Unauthorized User!');
    }
});

export default protect;

