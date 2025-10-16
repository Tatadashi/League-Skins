import { JSDOM } from "jsdom";

interface championProps {
  id: number;
  name: string;
  alias: string;
  square_url: string;
  release_date?: string;
}

async function getDatesHtml() {
  return fetch(
    "https://wiki.leagueoflegends.com/en-us/List_of_champions#References"
  )
    .then((response) => response.text())
    .then((html) => {
      return html;
    })
    .catch((error) => {
      throw new Error("Failed to fetch page: ", error);
    });
}

async function getChampIDs() {
  return fetch(
    "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json"
  )
    .then((response) => response.json())
    .catch((error) => {
      console.error("Failed to fetch page: ", error);
    });
}


const champReleases: { name: string; release_date: string }[] = [];
const html: string = await getDatesHtml();
const dom = new JSDOM(html);
const datesParentElement = dom.window.document.querySelectorAll(
  ".article-table tbody tr"
);

datesParentElement.forEach((date, index) => {
  if (index === 0) return;

  let champName: string | null = date.children[0].getAttribute("data-sort-value");
  if (!champName) return;

  champName = champName.replace("'/g", "//'");

  champReleases.push({
    name: champName,
    release_date: date.children[2].textContent.trimEnd(),
  });
});

const champions: championProps[] = [];
const champIDs = await getChampIDs();
champIDs.forEach((champ: championProps) => {
  //excluding doom bots who are 666 + id (ex. 66600 is doom bot id 00)
  if (champ.id < 0 || champ.id >= 66600) return;

  //alias for Dr. Mundo is DrMundo and Kha'Zix is Khazix (capitalizing is not consistent standard)
  champions.push({
    id: champ.id,
    name: champ.name,
    alias: champ.alias,
    square_url: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${champ.id}.png`,
  });
});

const championsInfo: championProps[] = [];
champions.forEach((champ) => {
  const champData = { ...champ };

  //using for loop so can break
  for (let i = 0; i < champReleases.length; i++) {
    if (champ.name === champReleases[i].name) {
      champData.release_date = champReleases[i].release_date;
      break;
    }
  }

  championsInfo.push(champData);
});

const championJSON = JSON.stringify(championsInfo);

export default championJSON;
