import { Router } from "express";
import { createCattle, deleteCattle, getCattle, getCattleById, updateCattle } from "../controllers/cattle.controller";


export const routesCattle = Router()

routesCattle.get('/', getCattle)
routesCattle.post('/', createCattle)
routesCattle.get('/:id', getCattleById)
routesCattle.put('/:id', updateCattle)
routesCattle.delete('/:id', deleteCattle)