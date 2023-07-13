import {Router} from "express";
import {pool} from "../../utils/db";

export const routesLogout = Router()
    .delete('/:id', async (req,res) => {
        const id = req.params;
        await pool.execute("DELETE FROM `refresh_token` WHERE `id_user`=:id" , id)
        res.sendStatus(204)
    })