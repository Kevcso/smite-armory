import pool from "../config/database";

export interface God {
  id?: number;
  name: string;
  title?: string;
  class: string;
  pantheon?: string;
  description?: string;
  image_url?: string;
  passive_name?: string;
  passive_description?: string;
  ability1_name?: string;
  ability1_description?: string;
  ability2_name?: string;
  ability2_description?: string;
  ability3_name?: string;
  ability3_description?: string;
  ultimate_name?: string;
  ultimate_description?: string;
}

export const getAllGods = async () => {
  const result = await pool.query("SELECT * FROM gods ORDER BY name");
  return result.rows;
};

export const getGodById = async (id: number) => {
  const result = await pool.query("SELECT * FROM gods WHERE id = $1", [id]);
  return result.rows[0];
};

export const createGod = async (god: God) => {
  const result = await pool.query(
    `INSERT INTO gods (name, title, class, pantheon, description, image_url, 
     passive_name, passive_description, ability1_name, ability1_description,
     ability2_name, ability2_description, ability3_name, ability3_description,
     ultimate_name, ultimate_description)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
     RETURNING *`,
    [
      god.name,
      god.title,
      god.class,
      god.pantheon,
      god.description,
      god.image_url,
      god.passive_name,
      god.passive_description,
      god.ability1_name,
      god.ability1_description,
      god.ability2_name,
      god.ability2_description,
      god.ability3_name,
      god.ability3_description,
      god.ultimate_name,
      god.ultimate_description,
    ]
  );
  return result.rows[0];
};

export const removeGod = async (id: number) => {
  const result = await pool.query(
    "DELETE FROM gods WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
