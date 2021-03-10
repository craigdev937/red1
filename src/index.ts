import "reflect-metadata";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import logger from "morgan";
import cookieParser from "cookie-parser";
import { trim } from "./middleware/trim";
import { userRt } from "./routes/userRt";
import { postRt } from "./routes/postRt";
import { createConnection } from "typeorm";

(async () => {
    await createConnection();
    console.log("PostgreSQL is now Connected!");
    const app: express.Application = express();
    app.use(helmet());

    // Middleware
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());
    app.use(logger("dev"));
    app.use(trim);  // List before Routes.
    app.use(cookieParser());

    // Routes
    app.use("/api/user", userRt);
    app.use("/api/post", postRt);
    
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Server: http://localhost:${port}`);
        console.log("Press Ctrl + C to exit.");
    })
})();



