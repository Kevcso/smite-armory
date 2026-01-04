import pool from "../src/config/database";

interface GodData {
  name: string;
  title: string;
  class: string;
  pantheon: string;
  description: string;
  image_url: string;
  passive_name: string;
  passive_description: string;
  ability1_name: string;
  ability1_description: string;
  ability2_name: string;
  ability2_description: string;
  ability3_name: string;
  ability3_description: string;
  ultimate_name: string;
  ultimate_description: string;
}

// List of all Smite 2 gods (you'll need to update this list)
const godNames = [
  "Achilles",
  "Agni",
  "Aladdin",
  "Amaterasu",
  "Anhur",
  "Anubis",
  "Aphrodite",
  "Apollo",
  "Ares",
  "Artemis",
  "Artio",
  "Athena",
  "Awilix",
  "Bacchus",
  "Baron Samedi",
  "Bellona",
  "Cabrakan",
  "Cerberus",
  "Cernunnos",
  "Chaac",
  "Cupid",
  "Da Ji",
  "Danzaburou",
  "Eset",
  "Fenrir",
  "Ganesha",
  "Geb",
  "Guan Yu",
  "Hades",
  "Hecate",
  "Hercules",
  "Hou Yi",
  "Hua Mulan",
  "Hun Batz",
  "Izanami",
  "Janus",
  "Jing Wei",
  "Jormungandr",
  "Kali",
  "Khepri",
  "Kukulkan",
  "Loki",
  "Medusa",
  "Mercury",
  "Merlin",
  "Mordred",
  "Neith",
  "Nemesis",
  "Nu Wa",
  "Nut",
  "Odin",
  "Osiris",
  "Pele",
  "Poseidon",
  "Princess Bari",
  "Ra",
  "Rama",
  "Scylla",
  "Sobek",
  "Sol",
  "Sun Wukong",
  "Susano",
  "Sylvanus",
  "Thanatos",
  "The Morrigan",
  "Thor",
  "Tsukuyomi",
  "Ullr",
  "Vulcan",
  "Xbalanque",
  "Yemoja",
  "Ymir",
  "Zeus",
];

async function fetchGodData(godName: string): Promise<GodData | null> {
  try {
    const url = `https://wiki.smite2.com/api.php?action=parse&page=${godName}&format=json`;
    console.log(`Fetching ${godName}...`);

    const response = await fetch(url);
    const data = await response.json();

    if (!data.parse) {
      console.log(`Could not find ${godName}`);
      return null;
    }

    const htmlContent = data.parse.text["*"];

    // Parse the HTML to extract god info
    const imageUrl = await fetchGodImage(godName);

    const godData: GodData = {
      name: godName,
      title: extractTitle(htmlContent),
      class: extractClass(htmlContent),
      pantheon: extractPantheon(htmlContent),
      description: extractDescription(htmlContent),
      image_url: imageUrl,
      passive_name: extractAbilityName(htmlContent, "Passive"),
      passive_description: extractAbilityDescription(htmlContent, "Passive"),
      ability1_name: extractAbilityName(htmlContent, "1st Ability"),
      ability1_description: extractAbilityDescription(
        htmlContent,
        "1st Ability"
      ),
      ability2_name: extractAbilityName(htmlContent, "2nd Ability"),
      ability2_description: extractAbilityDescription(
        htmlContent,
        "2nd Ability"
      ),
      ability3_name: extractAbilityName(htmlContent, "3rd Ability"),
      ability3_description: extractAbilityDescription(
        htmlContent,
        "3rd Ability"
      ),
      ultimate_name: extractAbilityName(htmlContent, "Ultimate"),
      ultimate_description: extractAbilityDescription(htmlContent, "Ultimate"),
    };

    return godData;
  } catch (error) {
    console.error(`Error fetching ${godName}:`, error);
    return null;
  }
}

function extractTitle(html: string): string {
  const match = html.match(/<th>Title:\s*<\/th>\s*<td><b>(.*?)<\/b>/);
  return match ? match[1] : "";
}

function extractClass(html: string): string {
  // For now, we'll leave this empty - it's tricky to extract
  // You can manually set this or improve the parsing
  return "";
}

function extractPantheon(html: string): string {
  const match = html.match(/<th>Pantheon:\s*<\/th>\s*<td>.*?title="(.*?)"/);
  return match ? match[1] : "";
}

function extractDescription(html: string): string {
  const match = html.match(
    /<h2><span class="mw-headline" id="Lore">Lore<\/span>.*?<p><i>(.*?)<\/i>/s
  );
  if (match) {
    // Remove HTML tags and clean up
    return match[1]
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }
  return "";
}
async function fetchGodImage(godName: string): Promise<string> {
  const url =
    "https://wiki.smite2.com/api.php?action=query" +
    "&prop=pageimages" +
    "&pithumbsize=512" +
    "&format=json" +
    `&titles=${encodeURIComponent(godName)}` +
    "&origin=*";

  const res = await fetch(url);
  const data = await res.json();

  const page = Object.values(data.query.pages)[0] as any;
  return page?.thumbnail?.source ?? "";
}

function extractAbilityName(html: string, abilityType: string): string {
  const regex = new RegExp(
    `<th colspan="2"><span style="color:#fff;">${abilityType}</span> - <span style="font-size: 125%; font-weight: bold;">(.*?)</span>`
  );
  const match = html.match(regex);
  return match ? match[1] : "";
}

function extractAbilityDescription(html: string, abilityType: string): string {
  const regex = new RegExp(
    `<th colspan="2"><span style="color:#fff;">${abilityType}</span>.*?<td style="width: 526px;">(.*?)</td>`,
    "s"
  );
  const match = html.match(regex);
  if (match) {
    return match[1]
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }
  return "";
}

async function insertGodIntoDatabase(god: GodData) {
  try {
    const result = await pool.query(
      `INSERT INTO gods (name, title, class, pantheon, description, image_url, 
       passive_name, passive_description, ability1_name, ability1_description,
       ability2_name, ability2_description, ability3_name, ability3_description,
       ultimate_name, ultimate_description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
       ON CONFLICT (name) DO UPDATE
       SET image_url = EXCLUDED.image_url
       WHERE gods.image_url = ''
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

    if (result.rows.length > 0) {
      console.log(`✅ Added ${god.name} to database`);
    } else {
      console.log(`ℹ️  ${god.name} already exists in database`);
    }
  } catch (error) {
    console.error(`❌ Error inserting ${god.name}:`, error);
  }
}

async function main() {
  console.log("Starting god data fetch...\n");

  for (const godName of godNames) {
    const godData = await fetchGodData(godName);

    if (godData) {
      await insertGodIntoDatabase(godData);
      // Wait 1 second between requests to be nice to the API
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  console.log("\n✅ Done!");
  process.exit(0);
}

main();
