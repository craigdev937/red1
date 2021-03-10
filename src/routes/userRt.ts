import express from "express";
import { Login, Logout, Me, Register } from "../controllers/userCon";
import { auth } from "../middleware/auth";

export const userRt: express.Router = express.Router();
    userRt.post("/register", Register);
    userRt.post("/login", Login);
    userRt.get("/me", auth, Me);
    userRt.get("/logout", auth, Logout);



