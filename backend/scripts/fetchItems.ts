import pool from "../src/config/database";

interface ItemData {
  name: string;
  tier: number;
  cost: number;
  category: string;
  description: string;
  passive_description: string;
  stats: object;
  image_url: string;
}

// All items from the wiki
const itemsByCategory = {
  Relics: [
    "Purification Beads",
    "Blink Rune",
    "Agility Relic",
    "Aegis of Acceleration",
    "Sundering Arc",
    "Phantom Shell",
    "Shell of Rebuke",
    "Sundering Echo",
    "Talisman of Purification",
    "Blinking Abyss",
    "Time-lock Aegis",
    "Agility Greaves",
  ],
  Curios: [
    "Meditation",
    "Heimdallr's Sight",
    "Gjallarflare",
    "Bifrost Shard",
    "Battle Cry",
  ],
  Consumables: [
    "Eyes of the Jungle",
    "Runic Bomb",
    "Crystalline Egg",
    "Obsidian Dagger",
    "Health Potion",
    "Vision Ward",
    "Multi Potion",
    "Mana Potion",
    "Sentry Ward",
    "Health Chalice",
    "Warding Chalice",
    "Elixir of Strength",
    "Elixir of Intelligence",
  ],
  Starters: [
    "Selflessness",
    "War Flag",
    "Leather Cowl",
    "Warrior's Axe",
    "Bluestone Pendant",
    "Gilded Arrow",
    "Bumba's Golden Dagger",
    "Bumba's Cudgel",
    "Sands Of Time",
    "Vampiric Shroud",
    "Conduit Gem",
    "Death's Toll",
  ],
  "Upgraded Starters": [
    "Heroism",
    "War Banner",
    "Sundering Axe",
    "Bluestone Brooch",
    "Hunter's Cowl",
    "Death's Embrace",
    "Pendulum Of The Ages",
    "Archmage's Gem",
    "Sharpshooter's Arrow",
    "Bumba's Spear",
    "Bumba's Hammer",
    "Blood-soaked Shroud",
  ],
  "Tier I": [
    "Bow",
    "Shield",
    "Sash",
    "Rune",
    "Reliquary",
    "Medallion",
    "Circlet",
    "Ring",
    "Axe",
    "Gem",
    "Scythe",
    "Sabre",
  ],
  "Tier II": [
    "Mana Tome",
    "Adroit Ring",
    "Olmec Blue",
    "Legionnaire Armor",
    "Hunter's Bow",
    "Circle of Protection",
    "Odigba",
    "Veve Charm",
    "Captain's Ring",
    "Sage's Ring",
    "Engraved Guard",
    "Cursed Sickle",
    "Medal of Disruption",
    "Medal of Defense",
    "Enchanted Bracelet",
    "Battle Axe",
    "Killing Stone",
    "Soul Reliquary",
    "Void Shard",
    "Ring of Dispel",
    "Flaming Pearl",
    "Oracle Staff",
    "Manchu Bow",
    "Survivor's Sash",
    "Skeggox",
    "Caestus",
    "Hooked Sword",
    "Infused Axe",
    "Zither",
    "Stalwart Sigil",
    "Adamantine Sickle",
    "Evil Eye",
    "Kopesh",
    "Lucerne Hammer",
    "Mote of Chaos",
  ],
  "Tier III - Offensive": [
    "Blood-Bound Book",
    "Bancroft's Talon",
    "Eros' Bow",
    "Book of Thoth",
    "Gem of Focus",
    "Jotunn's Revenge",
    "Sun Beam Bow",
    "Chronos' Pendant",
    "Transcendence",
    "Hydra's Lament",
    "Odysseus' Bow",
    "Rage",
    "Bracer of The Abyss",
    "Daybreak Gavel",
    "Barbed Carver",
    "Vital Amplifier",
    "Nimble Ring",
    "Divine Ruin",
    "Lernaean Bow",
    "Dagger of Frenzy",
    "Devourer's Gauntlet",
    "Soul Gem",
    "Bragi's Harp",
    "Polynomicon",
    "Oath-Sworn Spear",
    "Necronomicon",
    "The Executioner",
    "Bloodforge",
    "Typhon's Heart",
    "The Reaper",
    "Qin's Blade",
    "Tyrfing",
    "Ancient Signet",
    "Gluttonous Grimoire",
    "Death Metal",
    "The Cosmic Horror",
    "Hastened Fatalis",
    "Avenging Blade",
    "Spear of Desolation",
    "Arondight",
    "Riptalon",
    "Musashi's Dual Swords",
    "Tekko-Kagi",
    "Doom Orb",
    "Jade Scepter",
    "Demon Blade",
    "Staff of Myrddin",
    "The Crusher",
    "Totem of Death",
    "The World Stone",
    "Pendulum Blade",
    "Deathbringer",
    "Soul Reaver",
    "Heartseeker",
    "Rod of Tahuti",
    "Obsidian Shard",
    "Titan's Bane",
    "Dreamer's Idol",
    "Avatar's Parashu",
  ],
  "Tier III - Defensive": [
    "Gauntlet of Thebes",
    "Yogi's Necklace",
    "Chandra's Grace",
    "Eye of Providence",
    "Spectral Armor",
    "Amanita Charm",
    "Genji's Guard",
    "Phoenix Feather",
    "Stampede",
    "Breastplate of Valor",
    "Shield of the Phoenix",
    "Screeching Gargoyle",
    "Berserker's Shield",
    "Contagion",
    "Prophetic Cloak",
    "Magi's Cloak",
    "Erosion",
    "Gladiator's Shield",
    "Pharaoh's Curse",
    "Ancile",
    "Umbral Link",
    "Shogun's Ofuda",
    "Oni Hunter's Garb",
    "Leviathan's Hide",
    "Spirit Robe",
    "Hide of the Nemean Lion",
    "Regrowth Striders",
    "Stygian Anchor",
    "Glorious Pridwen",
    "Stone of Binding",
    "Mystical Mail",
    "Ragnarok's Wake",
    "Mantle Of Discord",
    "Freya's Tears",
    "Heartwood Charm",
    "Draconic Scale",
    "Xibalban Effigy",
    "Circe's Hexstone",
    "Dwarven Plate",
    "Hussar's Wings",
  ],
  "Tier III - Hybrid": [
    "Rod Of Asclepius",
    "Scepter of Dominion",
    "Lifebinder",
    "Shield Splitter",
    "Golden Blade",
    "Eye of the Storm",
    "Helm of Radiance",
    "Gem of Isolation",
    "Brawler's Beat Stick",
    "Runeforged Hammer",
    "Eye of Erebus",
    "Void Shield",
    "Sanguine Lash",
    "Shifter's Shield",
    "Void Stone",
    "Triton's Conch",
    "Helm of Darkness",
    "Sphere of Negation",
    "Wish-Granting Pearl",
  ],
  "God Specific": [
    "Genie's Lamp",
    "Masterwork Mod",
    "Thermal Mod",
    "Seismic Mod",
    "Surplus Mod",
    "Shrapnel Mod",
    "Resonator Mod",
    "Dual Mod",
    "Efficiency Mod",
    "Training Grounds",
    "Alternator Mod",
    "Baron's Brew",
  ],
};

async function fetchItemData(
  itemName: string,
  category: string
): Promise<ItemData | null> {
  try {
    const namesToTry = [
      itemName,
      itemName.replace("'", "'"), // fancy apostrophe
      itemName.replace("'", ""), // without apostrophe
    ];

    let data = null;
    let htmlContent = null;

    for (const name of namesToTry) {
      const encodedName = encodeURIComponent(name);
      const url = `https://wiki.smite2.com/api.php?action=parse&page=${encodedName}&format=json`;

      if (name === itemName) {
        console.log(`Fetching ${itemName}...`);
      }

      const response = await fetch(url);
      const responseData = await response.json();

      if (responseData.parse) {
        data = responseData;
        htmlContent = data.parse.text["*"];
        break;
      }
    }

    if (!data || !htmlContent) {
      console.log(`Could not find ${itemName} (tried multiple variations)`);
      return null;
    }

    // Extract image URL
    const imageMatch = htmlContent.match(/src="(\/images\/[^"]+)"/);
    const imageUrl = imageMatch
      ? `https://wiki.smite2.com${imageMatch[1]}`
      : "";

    // Extract cost
    const costMatch = htmlContent.match(/<th>Cost:\s*<\/th>\s*<td[^>]*>(\d+)/);
    const cost = costMatch ? parseInt(costMatch[1]) : 0;

    // Extract stats - IMPROVED parsing to catch ALL stats
    const statsMatch = htmlContent.match(
      /<th>Stats:\s*<\/th>\s*<td>(.*?)<\/td>/s
    );
    let stats: any = {};
    if (statsMatch) {
      const statsHtml = statsMatch[1];

      // Parse ALL stat patterns:
      // Pattern 1: <b>15</b> Strength
      // Pattern 2: <b>20%</b> Attack Speed
      // Pattern 3: <b>10%</b>\nPenetration (with newline)

      const statRegex = /<b>([\d.]+)%?<\/b>\s+([A-Za-z\s]+?)(?:\s*<br|\s*$)/gi;
      let match;
      while ((match = statRegex.exec(statsHtml)) !== null) {
        const value = match[1];
        const statName = match[2].trim().replace(/\s+/g, " ");

        if (statName && statName.length > 2) {
          stats[statName] = parseFloat(value);
        }
      }
    }

    // Extract passive effect
    const passiveMatch = htmlContent.match(
      /<th>Passive Effect:\s*<\/th>\s*<td>(.*?)<\/td>/s
    );
    let passiveDescription = "";
    if (passiveMatch) {
      passiveDescription = passiveMatch[1]
        .replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim();
    }

    // Extract item type/tier
    const itemTypeMatch = htmlContent.match(
      /<th[^>]*>Item Type:\s*<\/th>\s*<td>(.*?)<\/td>/s
    );
    let tier = 1;
    let itemType = "";
    if (itemTypeMatch) {
      itemType = itemTypeMatch[1].replace(/<[^>]*>/g, "").trim();
      if (itemType.includes("Tier 1") || itemType.includes("T1")) tier = 1;
      else if (itemType.includes("Tier 2") || itemType.includes("T2")) tier = 2;
      else if (itemType.includes("Tier 3") || itemType.includes("T3")) tier = 3;
      else if (itemType.includes("Tier 4") || itemType.includes("T4")) tier = 4;
    }

    // Description - item name and basic info
    const description = `${itemName} - ${itemType || category}`;

    const itemData: ItemData = {
      name: itemName,
      tier: tier,
      cost: cost,
      category: category,
      description: description,
      passive_description: passiveDescription,
      stats: stats,
      image_url: imageUrl,
    };

    return itemData;
  } catch (error) {
    console.error(`Error fetching ${itemName}:`, error);
    return null;
  }
}

async function insertItemIntoDatabase(item: ItemData) {
  try {
    const result = await pool.query(
      `INSERT INTO items (name, tier, cost, category, description, passive_description, stats, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       ON CONFLICT (name) DO UPDATE
       SET tier = EXCLUDED.tier,
           cost = EXCLUDED.cost,
           category = EXCLUDED.category,
           description = EXCLUDED.description,
           passive_description = EXCLUDED.passive_description,
           stats = EXCLUDED.stats,
           image_url = EXCLUDED.image_url
       RETURNING *`,
      [
        item.name,
        item.tier,
        item.cost,
        item.category,
        item.description,
        item.passive_description,
        JSON.stringify(item.stats),
        item.image_url,
      ]
    );

    console.log(`Added ${item.name} to database`);
  } catch (error) {
    console.error(`Error inserting ${item.name}:`, error);
  }
}

async function main() {
  console.log("Starting item data fetch...\n");

  let totalItems = 0;
  let successfulItems = 0;

  for (const [category, items] of Object.entries(itemsByCategory)) {
    console.log(`\n Fetching ${category}...\n`);

    for (const itemName of items) {
      totalItems++;
      const itemData = await fetchItemData(itemName, category);

      if (itemData) {
        await insertItemIntoDatabase(itemData);
        successfulItems++;
      }

      // Wait 1 second between requests to be nice to the API
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  console.log(
    `\n Done! Successfully added ${successfulItems}/${totalItems} items.`
  );
  process.exit(0);
}

main();
