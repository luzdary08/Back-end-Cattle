import { Request, Response } from "express";
import { Food } from "../models/Food";


export async function getFood(req: Request, res: Response) {
  try {
    const findFood = await Food.find();
    if (!findFood) {
      throw new Error("No hay alimentos");
    }

    res.json({
      message: findFood,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    }
  }
}

export async function createFood(req: Request, res: Response) {
  try {
    const newFood = new Food(req.body);
    await newFood.save();
    res.json({
      message: "Alimento creado correctamente",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    }
  }
}

export async function getFoodById(req: Request, res: Response) {
  try {
    const findFood = await Food.findById(req.params.id);
    if (!findFood) {
      throw new Error("No hay alimentos");
    }

    res.json({
      message: findFood,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    }
  }
}

export async function updateFood(req: Request, res: Response) {
  try {
    const findFood = await Food.findById(req.params.id);
    if (!findFood) {
      throw new Error("No hay alimentos");
    }

    findFood.name = req.body.name;
    findFood.amount = req.body.amount;
    findFood.unit = req.body.unit;
    findFood.description = req.body.description;
    findFood.user = req.body.user;
    findFood.cattle = req.body.cattle;

    await findFood.save();

    res.json({
      message: "Alimento actualizado correctamente",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    }
  }
}

export async function deleteFood(req: Request, res: Response) {
  try {
    const findFood = await Food.findById(req.params.id);
    if (!findFood) {
      throw new Error("No hay alimentos");
    }

    await findFood.deleteOne();

    res.json({
      message: "Alimento eliminado correctamente",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    }
  }
}
