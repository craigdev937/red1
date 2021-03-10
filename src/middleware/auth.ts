import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { config } from "../config/keys";
import { Users } from "../models/Users";

export const auth: RequestHandler =
async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) throw new Error("Unauthenticated");
        const { username }: any = jwt.verify(token, config.JWT_SECRET);
        const user = await Users.findOne({ username });
        if (!user) throw new Error("Unauthenticated");
        res.locals.user = user;
        return next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error: "Unauthenticated"});
        next(error);
    }
};



