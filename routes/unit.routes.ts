import { Router } from "express";
import { createUnit, deleteUnit, getUnit, getUnitById, updateUnit } from "../controllers/unit.controller";


export const routesUnit = Router()

routesUnit.get('/', getUnit)
routesUnit.get('/:id', getUnitById)
routesUnit.put('/:id', updateUnit)
routesUnit.post('/', createUnit)
routesUnit.delete('/:id', deleteUnit)