import express from "express";
import { connectDB } from "./connects/connects.js";
import { router } from "./routes/url.js";
import { userRouter } from './routes/users.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import { restrictTologgedInUsers } from './middlewares/index.js';
//mongodb connection
connectDB("mongodb://localhost:27017/URL-Shortner")
    .then(() => console.log("MongoDb Connected"))
    .catch((err) => console.log("Error:", err));
const app = express();
const port = 8000;
//setting templating engine in express
app.set('view engine', 'ejs');
//setting ejs files folder to pick files
app.set('views', path.resolve('./views'));
//Setting Boostrap
app.use('/css', express.static(path.join('./node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join('./node_modules/bootsrap/dist/js')));
app.use('/font', express.static(path.join('./node_modules/bootstrap-icons/font')));
//setting custom css
// app.set('views',path.resolve('./views'))
// middleware
app.use(express.json());
app.use(cookieParser());
//for url /form data parsing
app.use(express.urlencoded({ extended: true }));
// Routes
app.use("/url", restrictTologgedInUsers, router);
app.use('/users', userRouter);
app.listen(port, () => {
    console.log(`Server has started ${port}`);
});
