import {Router} from "express";
import {pool} from "../../utils/db";
import {authenticateToken} from "../../helpers/authenticateToken";

export const routesRuch = Router()
    .get('/ruch', authenticateToken, async (req, res) => {
        const matches = await pool.execute("SELECT * FROM `meczruch`");
        console.log(matches[0])
        if(!matches) {
            res.sendStatus(404)
        }

        res.status(201).json(matches)
    })