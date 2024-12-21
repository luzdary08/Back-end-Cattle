import { Router } from "express";
import { createRace, deteleRace, getRace, getRaceById, updateRace } from "../controllers/race.controller";


export const routesRace = Router()


routesRace.get('/', getRace)
routesRace.get('/:id', getRaceById)
routesRace.post('/', createRace)
routesRace.delete('/:id', deteleRace)
routesRace.put('/:id', updateRace)