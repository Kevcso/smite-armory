-- Gods table
CREATE TABLE gods (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(200),
  class VARCHAR(50) NOT NULL, -- Assassin, Warrior, Mage, etc.
  pantheon VARCHAR(50), -- Greek, Norse, Egyptian, etc.
  description TEXT,
  image_url VARCHAR(500),
  passive_name VARCHAR(100),
  passive_description TEXT,
  ability1_name VARCHAR(100),
  ability1_description TEXT,
  ability2_name VARCHAR(100),
  ability2_description TEXT,
  ability3_name VARCHAR(100),
  ability3_description TEXT,
  ultimate_name VARCHAR(100),
  ultimate_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Items table
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  tier INTEGER NOT NULL, -- 1, 2, 3, etc.
  cost INTEGER NOT NULL,
  category VARCHAR(50), -- Physical, Magical, Defense, etc.
  description TEXT,
  passive_description TEXT,
  stats JSONB, -- Store stats as JSON: {power: 50, health: 200, etc}
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Builds table
CREATE TABLE builds (
  id SERIAL PRIMARY KEY,
  god_id INTEGER REFERENCES gods(id) ON DELETE CASCADE,
  build_name VARCHAR(200) NOT NULL,
  author_name VARCHAR(100),
  description TEXT,
  role VARCHAR(50), -- Jungle, Solo, Mid, etc.
  votes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Build Items junction table
CREATE TABLE build_items (
  id SERIAL PRIMARY KEY,
  build_id INTEGER REFERENCES builds(id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
  position INTEGER NOT NULL, -- Item order in build (1-6)
  UNIQUE(build_id, position)
);

-- Indexes for performance
CREATE INDEX idx_gods_class ON gods(class);
CREATE INDEX idx_builds_god_id ON builds(god_id);
CREATE INDEX idx_build_items_build_id ON build_items(build_id);