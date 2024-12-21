import { Request, Response } from "express"
import { Race } from "../models/Race"
import { Cattle } from "../models/Cattle"



export async function getRace(req: Request, res: Response) {
    try {
        const findRace = await Race.find()
        if (!findRace) {
            throw new Error('No hay razas en estado saludable')
        }

        res.json({
            message: findRace
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }
}

export async function getRaceById(req: Request, res: Response) {
    try {
        const findRace = await Race.findById(req.params.id)
        if (!findRace) {
            throw new Error('No hay razas en estado saludable')
        }

        res.json({
            message: findRace
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }
    
}

export async function createRace(req: Request, res: Response) {
    try {
        const newRace = new Race(req.body)
        await newRace.save()
        res.json({
            message: "Raza creado correctamente"
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }
}

export async function deteleRace(req: Request, res: Response) {
    try {
        const findRace = await Race.findById(req.params.id)

        
        
        if (!findRace) {
            throw new Error('No hay razas en estado saludable')
        }

        console.log(findRace.cattle.length);

        if (findRace.cattle.length > 0) {
            throw new Error('No se puede eliminar una raza con animales')
        }

        
        await findRace.deleteOne()

         res.json({
            message: "Raza eliminado correctamente"
        })

    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }
}

export async function updateRace(req: Request, res: Response) {
    try {
        const findRace = await Race.findById(req.params.id)
        if (!findRace) {
            throw new Error('No hay razas en estado saludable')
        }

        const updateRace = await Race.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.json({
            message: "Raza actualizada correctamente"
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }
}