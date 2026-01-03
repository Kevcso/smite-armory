import pool from '../config/database';

export interface Item {
  id?: number;
  name: string;
  tier: number;
  cost: number;
  category?: string;
  description?: string;
  passive_description?: string;
  stats?: object;
  image_url?: string;
}

export const getAllItems = async () => {
  const result = await pool.query('SELECT * FROM items ORDER BY name');
  return result.rows;
};

export const getItemById = async (id: number) => {
  const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
  return result.rows[0];
};

export const createItem = async (item: Item) => {
  const result = await pool.query(
    `INSERT INTO items (name, tier, cost, category, description, passive_description, stats, image_url)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [item.name, item.tier, item.cost, item.category, item.description, 
     item.passive_description, JSON.stringify(item.stats), item.image_url]
  );
  return result.rows[0];
};

export const updateItem = async (id: number, item: Item) => {
  const result = await pool.query(
    `UPDATE items 
     SET name = $1, tier = $2, cost = $3, category = $4, description = $5, 
         passive_description = $6, stats = $7, image_url = $8
     WHERE id = $9
     RETURNING *`,
    [item.name, item.tier, item.cost, item.category, item.description,
     item.passive_description, JSON.stringify(item.stats), item.image_url, id]
  );
  return result.rows[0];
};

export const deleteItem = async (id: number) => {
  await pool.query('DELETE FROM items WHERE id = $1', [id]);
};