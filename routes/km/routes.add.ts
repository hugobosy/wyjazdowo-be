import {Router} from "express";

export const routesAdd = Router()
    .post("/add/:token/:km", (req,res) => {
        const {token, km} = req.params;
        console.log(token, km)
        res.status(201).send('Adding km to database')
    })