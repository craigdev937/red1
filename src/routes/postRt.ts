import express from "express";
import { auth } from "../middleware/auth";
import { CreatePost } from "../controllers/postCon";

export const postRt: express.Router = express.Router();
    postRt.post("/", auth, CreatePost);



