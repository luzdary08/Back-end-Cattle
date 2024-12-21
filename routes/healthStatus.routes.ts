import { Router } from "express";
import { createHealthStatus, deleteHealthStatus, getHealthStatus, getHealthStatusById, updateHealthStatus } from "../controllers/healthstatus.controller";


export const routesHealthStatus = Router()

routesHealthStatus.get('/', getHealthStatus)
routesHealthStatus.get('/:id', getHealthStatusById)
routesHealthStatus.post('/', createHealthStatus)
routesHealthStatus.put('/:id', updateHealthStatus)
routesHealthStatus.delete('/:id', deleteHealthStatus)