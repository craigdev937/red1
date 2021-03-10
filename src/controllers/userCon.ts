import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { RequestHandler } from "express";
import { Users } from "../models/Users";
import { isEmpty, validate } from "class-validator";
import { config } from "../config/keys";

export const Register: RequestHandler =
async (req, res, next) => {
    try {
        const user: Users = new Users();
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;
        const valError = await validate(user);
        if (valError.length > 0) {
            return res.status(400).json({valError})
        };
        await user.save();
        return res.status(201).json(user);
    } catch (error) {
        res.status(500).json({msg: error.message});
        next(error);
    }
};

export const Login: RequestHandler = 
async (req, res, next) => {
    const { username, password } = req.body;
    try {
        let errors: any = {};
        if (isEmpty(username)) errors.username = "Username must not be empty";
        if (isEmpty(password)) errors.password = "Password must not be empty";
        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors);
        };

        const user = await Users.findOne({ username });
        if (!user) return res.status(404).json({error: "User not found!"});
        const passwordMatches = await bcrypt.compare(
            password, 
            user.password
        );
        if (!passwordMatches) {
            return res.status(401).json({password: "Password is incorrect!"});
        };

        const token = jwt.sign({ username }, config.JWT_SECRET);

        res.set("Set-Cookie", cookie.serialize("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600,  // Age in seconds.
            path: "/"
        }))
        return res.json(user);

    } catch (error) {
        res.status(500).json({msg: error.message});
        next(error);
    }
};

export const Me: RequestHandler =
async (req, res, next) => {
    return res.json(res.locals.user);
};

export const Logout: RequestHandler =
async (req, res, next) => {
    try {
        res.set("Set-Cookie", cookie.serialize("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(0),
            path: "/"
        }));
        return res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({msg: error.message});
        next(error);
    }
};



