import { JSDOM } from "jsdom";

interface ChampionProps {
  id: number;
  name: string;
  description?: string;
  alias: string;
  square_url?: string;
  splash_url?: string;
  tile_url?: string;
  release_date?: string;
}

//CommunityDragon doesn't keep release dates bcz Rito prob doesn't keep them in files, so using wiki
async function fetchDatesHtml() {
  return fetch(
    "https://wiki.leagueoflegends.com/en-us/List_of_champions#References"
  )
  .then((response) => response.text())
  .then((html) => {
    return html;
  })
  .catch((error) => {
    throw new Error("Failed to fetch champ dates: ", error);
  });
}

//use datesHtml to get list of champion obj with id + dates
async function getReleaseDatesFromWiki() {
  const champReleases: { name: string; release_date: string }[] = [];
  const html: string = await fetchDatesHtml();
  const dom = new JSDOM(html);
  const datesParentElement = dom.window.document.querySelectorAll(
    ".article-table tbody tr"
  );
  
    datesParentElement.forEach((date, index) => {
    if (index === 0) return;

    let champName: string | null =
      date.children[0].getAttribute("data-sort-value");
    if (!champName) return;

    champName = champName.replace("'/g", "//'");

    champReleases.push({
      name: champName,
      release_date: date.children[2].textContent.trimEnd(),
    });
  });

  return champReleases;
}

//has all the champion json files with id, name, desc, alias, content id, sqr portrait path, roles
async function fetchChampIDs() {
  return fetch(
    "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json"
  )
    .then((response) => response.json())
    .catch((error) => {
      console.error("Failed to fetch champ ids: ", error);
    });
}

//use champIDs to get list of champion obj with id, name, desc, alias, square_url
async function getChampIDs() {
  const champions: ChampionProps[] = [];
  const champIDs: ChampionProps[] = await fetchChampIDs();
  champIDs.forEach((champ: ChampionProps) => {
    //excluding doom bots who are 666 + id (ex. 66600 is doom bot id 00) and id -1 (invalid i presume)
    if (champ.id < 0 || champ.id >= 66600) return;

    //alias for Dr. Mundo is DrMundo and Kha'Zix is Khazix (capitalizing is not consistent standard)
    champions.push({
      id: champ.id,
      name: champ.name,
      description: champ.description,
      alias: champ.alias,
      square_url: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${champ.id}.png`
    });
  });
  return champions;
}

//has all skins by id + skinID, name, splashArtCenteredPath (hoverCard + champSelect), splashArtUncenteredPath (full splash), tilePath, loadScreenPath, rarity, isLegacy, desc, chromas + path, skinline, borderPath, etc
async function fetchSkins() {
  return fetch(
    "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/skins.json"
  )
  .then((response) => response.json())
  .catch((error) => {
    console.error("Failed to fetch champ imgs", error);
  });
}

//img path in skins.json is not same as through cdragon (prob so can use any version/latest/pbe and other stuff)
function convertImgPath(path: string) {
  let newPath: string = "https://raw.communitydragon.org/latest/plugins" + path.toLowerCase(); 
  //for some reason og path has assets/ASSETS
  newPath = newPath.replace(
    "lol-game-data/assets",
    "rcp-be-lol-game-data/global/default"
  );

  return newPath;
}

//add imgUrl for uncenteredSplash and tile from skinsJSON to champions
async function addChampImgs(champions: ChampionProps[]) {
  //use champIDs to get list of champion obj with id, splashUncenteredPath, tilePath
  const skins = await fetchSkins();
  const championsCopy: ChampionProps[] = [...champions];

  championsCopy.forEach((champ: ChampionProps) => {
    // format is id + '000' + skinID, ex. if Annie id = 1 and skinID = 22, it is 1000 + 22 = 1022
    const skinID: string = champ.id + "000";

    champ.splash_url = convertImgPath(skins[skinID].uncenteredSplashPath);
    champ.tile_url = convertImgPath(skins[skinID].tilePath);
  });

  return championsCopy;
}

let champions: ChampionProps[] = [];
const championIDs: ChampionProps[] = await getChampIDs();
const championReleases: { name: string, release_date: string}[] = await getReleaseDatesFromWiki();

//combine championsIDs and championReleases using id into champions[]
championIDs.forEach((champ) => {
  const champData = { ...champ };

  //using for loop so can break
  for (let i = 0; i < championReleases.length; i++) {
    if (champ.name === championReleases[i].name) {
      champData.release_date = championReleases[i].release_date;
      break;
    }
  }

  champions.push(champData);
});

champions = await addChampImgs(champions);
const championJSON = JSON.stringify(champions);

export default championJSON;
