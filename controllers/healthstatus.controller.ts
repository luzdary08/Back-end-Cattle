import { Request, Response } from "express"
import { HealthStatus, HealthStatusE, HealthStatusEnum } from "../models/HealthStatus"


export async function createHealthStatus(req: Request, res: Response) {
    try {
        const newHealthStatus = new HealthStatus(req.body)

        console.log( HealthStatusEnum[req.body.status as HealthStatusE]);
        

        newHealthStatus.value = HealthStatusEnum[req.body.status as HealthStatusE]

        await newHealthStatus.save()
        
        res.json({
            message: "Estado creado correctamente"
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }
}

export async function getHealthStatus(_req: Request, res: Response) {
    try {
        const findHealthStatus = await HealthStatus.find()
        if (!findHealthStatus) {
            throw new Error('No hay estados de salud')
        }

        res.json({
            message: findHealthStatus
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }
}

export async function getHealthStatusById(req: Request, res: Response) {
    try {
        const findHealthStatus = await HealthStatus.findById(req.params.id)
        if (!findHealthStatus) {
            throw new Error('No hay estados de salud')
        }

        res.json({
            message: findHealthStatus
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }
}

export async function updateHealthStatus(req: Request, res: Response) {
    try {
        const findHealthStatus = await HealthStatus.findById(req.params.id)
        if (!findHealthStatus) {
            throw new Error('No hay estados de salud')
        }

        findHealthStatus.status = req.body.status
        findHealthStatus.value = HealthStatusEnum[req.body.status as HealthStatusE]

        await findHealthStatus.save()

        res.json({
            message: "Estado actualizado correctamente"
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }
}

export async function deleteHealthStatus(req: Request, res: Response) {
    try {
        const findHealthStatus = await HealthStatus.findById(req.params.id)
        if (!findHealthStatus) {
            throw new Error('No hay estados de salud')
        }

        await findHealthStatus.deleteOne()

        res.json({
            message: "Estado eliminado correctamente"
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message })
        }
    }
}   