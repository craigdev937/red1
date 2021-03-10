import { RequestHandler } from "express";
import { Posts } from "../models/Posts";

export const CreatePost: RequestHandler =
async (req, res, next) => {
    const { title, body, sub } = req.body;
    const user = res.locals.user;
    if (title.trim() === "") {
        return res.status(400).json({title: "Title must not be empty."});
    };
    try {
        const post: Posts = new Posts({ title, body, user, subName: sub });
        await post.save();
        return res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error.message});
        next(error);
    };
};




