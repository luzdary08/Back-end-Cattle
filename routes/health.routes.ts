import { Router } from "express";
import { createHealth, deleteHealth, getHealth, getHealthById, updateHealth } from "../controllers/health.controller";


export const routesHealth = Router()

routesHealth.get('/', getHealth)
routesHealth.get('/:id', getHealthById)
routesHealth.post('/', createHealth)
routesHealth.put('/:id', updateHealth)
routesHealth.delete('/:id', deleteHealth) 