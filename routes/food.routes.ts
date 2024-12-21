import { Router } from "express";
import { createFood, deleteFood, getFood, getFoodById, updateFood } from "../controllers/food.controller";


export const routesFood = Router()


routesFood.get('/', getFood)
routesFood.post('/', createFood)
routesFood.get('/:id', getFoodById)
routesFood.put('/:id', updateFood)
routesFood.delete('/:id', deleteFood)