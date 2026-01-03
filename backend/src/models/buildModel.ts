import pool from '../config/database';

export interface Build {
  id?: number;
  god_id: number;
  build_name: string;
  author_name?: string;
  description?: string;
  role?: string;
  votes?: number;
}

export interface BuildWithItems extends Build {
  god_name?: string;
  items?: any[];
}

export const getAllBuilds = async () => {
  const result = await pool.query(`
    SELECT builds.*, gods.name as god_name 
    FROM builds 
    JOIN gods ON builds.god_id = gods.id 
    ORDER BY builds.created_at DESC
  `);
  return result.rows;
};

export const getBuildById = async (id: number) => {
  // Get build info with god name
  const buildResult = await pool.query(`
    SELECT builds.*, gods.name as god_name 
    FROM builds 
    JOIN gods ON builds.god_id = gods.id 
    WHERE builds.id = $1
  `, [id]);
  
  if (buildResult.rows.length === 0) return null;
  
  const build = buildResult.rows[0];
  
  // Get items for this build
  const itemsResult = await pool.query(`
    SELECT items.*, build_items.position 
    FROM build_items 
    JOIN items ON build_items.item_id = items.id 
    WHERE build_items.build_id = $1 
    ORDER BY build_items.position
  `, [id]);
  
  build.items = itemsResult.rows;
  return build;
};

export const getBuildsByGodId = async (godId: number) => {
  const result = await pool.query(`
    SELECT * FROM builds WHERE god_id = $1 ORDER BY votes DESC
  `, [godId]);
  return result.rows;
};

export const createBuild = async (build: Build, itemIds: number[]) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Insert build
    const buildResult = await client.query(`
      INSERT INTO builds (god_id, build_name, author_name, description, role, votes)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [build.god_id, build.build_name, build.author_name, build.description, build.role, build.votes || 0]);
    
    const newBuild = buildResult.rows[0];
    
    // Insert build items
    for (let i = 0; i < itemIds.length; i++) {
      await client.query(`
        INSERT INTO build_items (build_id, item_id, position)
        VALUES ($1, $2, $3)
      `, [newBuild.id, itemIds[i], i + 1]);
    }
    
    await client.query('COMMIT');
    return newBuild;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const deleteBuild = async (id: number) => {
  await pool.query('DELETE FROM builds WHERE id = $1', [id]);
};