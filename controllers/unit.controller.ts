import { Request, Response } from "express"
import { Unit } from "../models/Unit"


export async function getUnit(req: Request, res: Response) {
    try {
        const findUnit = await Unit.find()
        if (!findUnit) {
            throw new Error('No hay unidades')
        }

        res.json({
            message: findUnit
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }
}

export async function getUnitById(req: Request, res: Response) {
    try {
        const findUnit = await Unit.findById(req.params.id)
        if (!findUnit) {
            throw new Error('No hay unidades')
        }

        res.json({
            message: findUnit
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }
}

export async function createUnit(req: Request, res: Response) {
    try {
        const newUnit = new Unit(req.body)
        await newUnit.save()
        res.json({
            message: "Unidad creado correctamente"
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }
}

export async function updateUnit(req: Request, res: Response) {
    try {
        const findUnit = await Unit.findById(req.params.id)
        if (!findUnit) {
            throw new Error('No hay unidades')
        }

        findUnit.name = req.body.name

        await findUnit.save()

        res.json({
            message: "Unidad actualizado correctamente"
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }
}

export async function deleteUnit(req: Request, res: Response) {
    try {
        const findUnit = await Unit.findById(req.params.id)
        if (!findUnit) {
            throw new Error('No hay unidades')
        }

        await findUnit.deleteOne()

        res.json({
            message: "Unidad eliminado correctamente"
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }
}