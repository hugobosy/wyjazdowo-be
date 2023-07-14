import {Router} from "express";
import crypto from "crypto";
import {pool} from "../../utils/db";

export const routesRegister = Router()
    .post('/', async (req, res) => {
        const {login, email, password} = req.body;
        try {
            const hashPassword = crypto.createHash('md5').update(password).digest('hex');
            const data = {login, email, password: hashPassword}
            const dataUsers: any = await pool.execute("SELECT `login`, `email` FROM `user2`")
            if(dataUsers[0].find((u: any) => u.login === login || u.email === email)) {
                res.sendStatus(401)
                return
            }
            await pool.execute("INSERT INTO `user2` (`login`, `password`, `email`) VALUES (:login, :password, :email)", data)
            res.sendStatus(201);
        } catch (e) {
            res.sendStatus(500)
        }
    })