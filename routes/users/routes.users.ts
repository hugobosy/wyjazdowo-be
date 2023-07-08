import {Router} from "express";
import {pool} from "../../utils/db";
import {authenticateToken} from "../../helpers/authenticateToken";

export const routesUsers = Router()
    .get('/', authenticateToken, async(req,res) => {
        const users = await pool.execute("SELECT * from `user2`");
        console.log(users)
        res.json(users)
    })