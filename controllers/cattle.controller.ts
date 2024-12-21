import { Request, Response } from "express"
import { Cattle } from "../models/Cattle"
import { Race } from "../models/Race"
import { Health } from "../models/Health"
import { Food } from "../models/Food"


export async function getCattle(req: Request, res: Response) {
    try {
        const findCattle = await Cattle.find().populate({
            path : 'health',
            populate : {
              path : 'status',
            },
          }).populate('race')
        if (!findCattle) {
            throw new Error('No hay ganados')
        }

        res.json({
            message: findCattle
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }
}

export async function getCattleById(req: Request, res: Response) {
    try {
        const findCattle = await Cattle.findById(req.params.id)
        if (!findCattle) {
            throw new Error('No hay ganados')
        }

        res.json({
            message: findCattle
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }
}

const findRace = async (id:string)=>{
    const receOne = await Race.findById(id)
    if (!receOne) {
        throw new Error('No existe Race')
    }
    return receOne 
}

const findHealth = async (id:string)=>{
    const healthOne = await Health.findById(id)
    if (!healthOne) {
        throw new Error('No existe Health')
    }
    return healthOne 
}

const findFood = async (id:string)=>{
    const foodOne = await Food.findById(id)
    if (!foodOne) {
        throw new Error('No existe Food')
    }
    return foodOne 
}


export async function createCattle(req: Request, res: Response) {
    try {
        const newCattle = new Cattle(req.body)
        const race = await findRace(req.body.race)

        race.id = race.cattle.push(newCattle._id)
       

        await race.save()
        await newCattle.save()


        res.json({
            message: "animal creado correctamente"
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }
}

export async function updateCattle(req: Request, res: Response) {
    try {
        const findCattle = await Cattle.findById(req.params.id)
        if (!findCattle) {
            throw new Error('No se encontro el animal')
        }

        await findCattle.save()

        res.json({
            message: "Animal actualizado correctamente"
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }
}

export async function deleteCattle(req: Request, res: Response) {
    try {
        const findCattle = await Cattle.findById(req.params.id)
        if (!findCattle) {
            throw new Error('No se encontro el animal')
        }

        const findHealth = await Health.findById(findCattle.health)
        if (findHealth) {
            await findHealth.deleteOne()
        }

        await findCattle.deleteOne()

        res.json({
            message: "Animal eliminado correctamente"
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }
}