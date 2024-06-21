import argon2 from "argon2";
import connectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";
import { serialize } from 'cookie';
import Customers from "@/model/Customers";

const handler = async (req, res) => {

    if (req.method == 'POST') {
        try {

            let user;
            user = await Customers.findOne({ CustomerEmail: req.body.email });
            if (!user) {
                return res.status(401).json({ success: false, msg: "You are not Registered, Click on Register button above." });
            }

            const validPassword = await argon2.verify(user.Password, req.body.password);
            if (!validPassword) {
                return res.status(401).json({ success: false, msg: "Login failed. Please check your password." });
            }

            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_ADMIN, { expiresIn: "10d" });
            return res.setHeader('Set-Cookie', serialize('user_access_token', token, {
                httpOnly: true,
                sameSite: "strict",
                secure: true,
                path: '/',
            }))
                .json({ success: true, msg: "Login Successful" });

        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, msg: "Internal Server Error" });
        }
    }


};

export default connectDb(handler);
