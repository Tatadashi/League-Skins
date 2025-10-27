import { Link } from "react-router-dom";
import type { Skin } from "../../../../app/pages/collection/collection";
import { borderColors } from "../../../../utils/borderColors";

//have to surround it with curly brackets
interface SkinSqrProps {
  skin: Skin;
}

export default function SkinSquare({ skin }: SkinSqrProps) {
  return (
    <div className="flex flex-col grow text-center text-md dark:text-tan">
      <Link
        to={`/skin/${skin.skin_id}`}
        className={`aspect-square border-3 ${borderColors[skin.rarity.toLowerCase()]}`}
      >
        <img src={skin.tile_url} alt="" />
      </Link>
      <div className="flex flex-col grow justify-between text-sm">
        <h1>{skin.name}</h1>
        <h2 className="text-brown">{skin.champion_name}</h2>
      </div>
    </div>
  );
}
