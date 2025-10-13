import ChampSquare from "./champSquare/champSquare";

interface Champ {
  id: number;
  name: string;
  url: string;
}

interface ChampProps {
  champList: Champ[];
}

export default function ChampDisplay({ champList }: ChampProps) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,_120px)] grid-rows-[repeat(auto-fill,_150px)] gap-1 sm:gap-5 sm:p-5 place-content-center">
      {champList &&
        champList.map((champ: Champ) => (
          <ChampSquare id={champ.id} name={champ.name} imgUrl={champ.url} />
        ))}
    </ul>
  );
}
