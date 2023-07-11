import express, {json} from 'express';
import cors from 'cors';
import rateLimit from "express-rate-limit";
import {routesUsers} from "./routes/users/routes.users";
import {routesLogin} from "./routes/login/routes.login";
import {routesRegister} from "./routes/register/routes.register";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100
}))

app.use('/users', routesUsers)
app.use('/login', routesLogin)
app.use('/register', routesRegister)

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening http://localhost:3001');
})