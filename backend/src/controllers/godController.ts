import { Request, Response } from "express";
import * as godModel from "../models/godModel";

export const getGods = async (req: Request, res: Response) => {
  try {
    const gods = await godModel.getAllGods();
    res.json(gods);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch gods" });
  }
};

export const getGod = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const god = await godModel.getGodById(id);
    if (!god) {
      return res.status(404).json({ error: "God not found" });
    }
    res.json(god);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch god" });
  }
};

export const createGod = async (req: Request, res: Response) => {
  try {
    const newGod = await godModel.createGod(req.body);
    res.status(201).json(newGod);
  } catch (error) {
    res.status(500).json({ error: "Failed to create god" });
  }
};

export const removeGod = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await godModel.removeGod(id);
    res.json({ message: "God removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove god" });
  }
};
