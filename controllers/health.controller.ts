import e, { Request, Response } from "express"
import { Health } from "../models/Health"
import { Cattle } from "../models/Cattle"
import { Types } from "mongoose"



export async function getHealth(req: Request, res: Response) {
    try {
        const findHealth = await Health.find().populate('status').populate({
            path: 'cattle',
            populate: {
                path: 'race'
            }
        })
        if (!findHealth) {
            throw new Error('No hay diagnosticos en estado saludable')
        }

        res.json({
            message: findHealth
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }
}

export async function getHealthById(req: Request, res: Response) {
    try {
        const findHealth = await Health.findById(req.params.id).populate('status')
        if (!findHealth) {
            throw new Error('No hay diagnosticos en estado saludable')
        }


        res.json({
            message: findHealth
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }
    
}

export async function createHealth(req: Request, res: Response) {
    try {
        const newHealth = new Health(req.body)
        
        const findCattle = await Cattle.findById(newHealth.cattle)
        
        if (!findCattle) {
            throw new Error('No se encontro el cattle')
        }
        
        if (findCattle?.health != null) {
            throw new Error('Ya existe un diagnostico para este animal')
        }
        
        findCattle.health = newHealth._id as unknown as Types.ObjectId
        
        await findCattle.save()
        await newHealth.save()

        res.json({
            message: "diagnostico creado correctamente"
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }
}


export async function deleteHealth(req: Request, res: Response) {
    try {
        const findHealth = await Health.findById(req.params.id)
        if (!findHealth) {
            throw new Error('No se encontro el diagnostico')
        }

        const findCattle = await Cattle.findById(findHealth.cattle)

        if (!findCattle) {
            throw new Error('No se encontro el cattle')
        }

        findCattle.health = null 

        await findCattle.save()
        await findHealth.deleteOne()
        

        res.json({
            message: "Diagnostico eliminado correctamente"
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }
}

export async function updateHealth(req: Request, res: Response) {
    try {
        const findHealth = await Health.findById(req.params.id)
        if (!findHealth) {
            throw new Error('No se encontro el diagnostico')
        }

        findHealth.status = req.body.status
        findHealth.observes = req.body.observes
        findHealth.treatment = req.body.treatment
        findHealth.lastDate = req.body.lastDate
        findHealth.treatment = req.body.treatment

        await findHealth.save()
        

        res.json({
            message: "Diagnostico actualizado correctamente"
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }   
}