import { Request, Response } from 'express';
import * as itemModel from '../models/itemModel';

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await itemModel.getAllItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};

export const getItem = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const item = await itemModel.getItemById(id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch item' });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const newItem = await itemModel.createItem(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item' });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const updatedItem = await itemModel.updateItem(id, req.body);
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await itemModel.deleteItem(id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
};