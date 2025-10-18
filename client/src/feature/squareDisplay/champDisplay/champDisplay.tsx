import type { Champ } from "../../../app/pages/home/home";
import ChampSquare from "./champSquare/champSquare";

interface ChampProps {
  champList: Champ[] | undefined;
}

export default function ChampDisplay({ champList }: ChampProps) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,_120px)] grid-rows-[repeat(auto-fill,_150px)] gap-1 sm:gap-5 sm:p-5 place-content-center">
      {champList &&
        champList.map((champ: Champ, index) => (
          <ChampSquare
            key={index}
            id={champ.id}
            name={champ.name}
            imgUrl={champ.square_url}
          />
        ))}
    </ul>
  );
}
