require('dotenv').config();
import {Router} from "express";
import {pool} from "../../utils/db";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const routesLogin = Router()
    .post('/:username', async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const dto: any = await pool.execute("SELECT `login`, `password` from `user2` WHERE `login` = :username", {username});

        if (!dto[0].length) {
            res.status(401).send('Cannot find user');
            return
        }

        if (!password) {
            res.status(401).send('Password must not to be empty');
            return
        }

        const hash = crypto.createHash('md5').update(password).digest('hex');
        const user = dto[0].find((u: any) => u)


        if (hash === user.password) {
            const token = jwt.sign({login: user.login, password: user.password}, process.env.ACCESS_TOKEN)
            res.json(token)
        } else {
            res.status(401).send('Password incorrect')
        }

    })