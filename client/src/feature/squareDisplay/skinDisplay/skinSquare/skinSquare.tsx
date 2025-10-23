import { Link } from "react-router-dom";
import type { Skin } from "../../../../app/pages/collection/collection";

//have to surround it with curly brackets
interface SkinSqrProps {
  skin: Skin;
}

export default function SkinSquare({ skin }: SkinSqrProps) {
  return (
    <div className="flex flex-col grow text-center text-md dark:text-tan">
      <Link
        to={`/skin/${skin.id}`}
        className="aspect-square border-3 border-ultimate"
      >
        <img src={skin.tile_url} alt="" />
      </Link>
      <div className="flex flex-col grow justify-between text-sm">
        <h1>Prestige Masque of the Black Rose Katarina </h1>
        <h2 className="text-brown">{skin.name}</h2>
      </div>
    </div>
  );
}
