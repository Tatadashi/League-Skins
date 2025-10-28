import type { ChampionProps } from "../championModel/scrapeChampionInfo.ts";

//maybe release date, legacy, description?, otber in future
interface SkinProps {
  skin_id: number;
  id: number;
  name: string;
  champion_name: string;
  wiki_name: string;
  rarity: string;
  skin_line: string | null;
  splash_url?: string;
  tile_url?: string;
  //i dont think commenting out does anything but just in case
  // current_price?: number;
  // original_price?: number;
}

interface SkinLine {
  id: number;
  name: string;
  description: string;
}

//has all the champion json files with id, name, desc, alias, content id, sqr portrait path, roles
async function fetchChampIDs() {
  return fetch("https://league-skins-backend.vercel.app/champion")
    .then((response) => response.json())
    .catch((error) => {
      console.error("Failed to fetch champ ids: ", error);
    });
}

//skins have list of skinlines, not sure why (look at later)
async function fetchSkinlines() {
  return fetch(
    "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/skinlines.json",
  )
    .then((response) => response.json())
    .catch((error) => {
      console.error("Failed to fetch skinlines: ", error);
    });
}

//has all skins by id + skinID, name, splashArtCenteredPath (hoverCard + champSelect), splashArtUncenteredPath (full splash), tilePath, loadScreenPath, rarity, isLegacy, desc, chromas + path, skinline, borderPath, etc
async function fetchSkins() {
  return fetch(
    "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/skins.json",
  )
    .then((response) => response.json())
    .catch((error) => {
      console.error("Failed to fetch skins", error);
    });
}

//img path in skins.json is not same as through cdragon (prob so can use any version/latest/pbe and other stuff)
function convertImgPath(path: string) {
  let newPath: string =
    "https://raw.communitydragon.org/latest/plugins" + path.toLowerCase();
  //for some reason og path has assets/ASSETS
  newPath = newPath.replace(
    "lol-game-data/assets",
    "rcp-be-lol-game-data/global/default",
  );

  return newPath;
}

//remove k infront "kEpic" and convert if it is "kNoRarity"
function convertRarity(rarity: string) {
  let converted = rarity.slice(1);
  //for some reason arcane skins are this
  if (converted === "NoRarity" || converted === "Rare") {
    converted = "Standard";
  }

  return converted;
}

//wiki name is {champName}_{champSkinName, no spaces, PascalCase}Skin
function convertToWikiName(skinName: string, champName: string) {
  //exceptions is when splashart same even if different skins like Worlds 2012 Riven or any Presige 2022, might be others
  let converted: string = skinName.replace(`${champName}`, "");
  converted = converted.replace("Reignited Worlds 2012", "Worlds 2012");
  converted = converted.replace("(2022)", "");
  converted = converted.replaceAll(" ", "");
  converted = champName + " " + converted;
  converted = converted.replaceAll(" ", "_");
  converted += "Skin.jpg";

  return converted;
}

//just take first skinline (not sure if there is even multi skinline skins)
function getSkinLineName(skinLineData: SkinLine[], skinData: { id: number }[]) {
  if (!skinData) {
    return null;
  }

  let skinLineName = null;

  const firstSkinLineID = skinData[0].id;
  skinLineData.forEach((skinLineData: SkinLine) => {
    if (skinLineData.id === firstSkinLineID) {
      skinLineName = skinLineData.name;
    }
  });

  return skinLineName;
}

function convertToName(championData: ChampionProps[], champID: number) {
  let name: string = "noName";
  championData.forEach((champ) => {
    if (champ.id === champID) {
      name = champ.name;
    }
  });

  return name;
}

//add imgUrl for uncenteredSplash and tile from skinsJSON to champions
async function getSkins() {
  //use champIDs to get list of champion obj with id, splashUncenteredPath, tilePath
  const skins: SkinProps[] = [];
  const skinData = await fetchSkins();
  const skinlines = await fetchSkinlines();
  const championIDs = await fetchChampIDs();

  for (const i in skinData) {
    const skinInfo: SkinProps = {} as SkinProps;
    // format is id + '000' + skinID, ex. if Annie id = 1 and skinID = 22, it is 1000 + 22 = 1022;
    const champID = Math.round(skinData[i].id / 1000) * 1000;
    // want id to be 1 not 1000
    const specificChampID: number = champID / 1000;

    //id is skinNumber for specific champ while skinId is the specific skin ID ex. 1 vs 1001, 1 could be for other champs
    skinInfo.skin_id = skinData[i].id;
    skinInfo.id = skinData[i].id - champID;
    skinInfo.champion_name = convertToName(championIDs, specificChampID);
    skinInfo.name = skinData[i].name;
    skinInfo.wiki_name = convertToWikiName(
      skinInfo.name,
      skinInfo.champion_name,
    );

    skinInfo.rarity = convertRarity(skinData[i].rarity);
    skinInfo.skin_line = getSkinLineName(skinlines, skinData[i].skinLines);
    skinInfo.splash_url = convertImgPath(skinData[i].uncenteredSplashPath);
    skinInfo.tile_url = convertImgPath(skinData[i].tilePath);

    //not base skin and not doombot
    const last3Digits = String(skinInfo.skin_id).slice(-3);
    if (last3Digits !== "000") {
      skins.push(skinInfo);
    }
  }

  return skins;
}

const skins: SkinProps[] = await getSkins();
const skinJSON = JSON.stringify(skins);

export default skinJSON;
