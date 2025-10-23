import { Link } from "react-router-dom";
import type { Champ } from "../../../../app/pages/home/home";

//have to include key part from ul li
interface ChampSqrProps {
  key: number;
  champ: Champ;
}

export default function ChampSquare({ champ }: ChampSqrProps) {
  return (
    <div className="flex flex-col text-center text-md dark:text-tan">
      <Link
        to={`/${champ.id}`}
        className="aspect-square border border-black dark:border-tan"
      >
        <img src={champ.square_url} alt="" />
      </Link>
      {champ.name}
    </div>
  );
}
