import { Request, Response } from 'express';
import * as buildModel from '../models/buildModel';

export const getBuilds = async (req: Request, res: Response) => {
  try {
    const builds = await buildModel.getAllBuilds();
    res.json(builds);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch builds' });
  }
};

export const getBuild = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const build = await buildModel.getBuildById(id);
    if (!build) {
      return res.status(404).json({ error: 'Build not found' });
    }
    res.json(build);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch build' });
  }
};

export const getBuildsByGod = async (req: Request, res: Response) => {
  try {
    const godId = parseInt(req.params.godId);
    const builds = await buildModel.getBuildsByGodId(godId);
    res.json(builds);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch builds for god' });
  }
};

export const createBuild = async (req: Request, res: Response) => {
  try {
    const { god_id, build_name, author_name, description, role, item_ids } = req.body;
    
    if (!god_id || !build_name || !item_ids || item_ids.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const buildData = {
      god_id,
      build_name,
      author_name,
      description,
      role
    };
    
    const newBuild = await buildModel.createBuild(buildData, item_ids);
    res.status(201).json(newBuild);
  } catch (error) {
    console.error('Error creating build:', error);
    res.status(500).json({ error: 'Failed to create build' });
  }
};

export const deleteBuild = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await buildModel.deleteBuild(id);
    res.json({ message: 'Build deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete build' });
  }
};