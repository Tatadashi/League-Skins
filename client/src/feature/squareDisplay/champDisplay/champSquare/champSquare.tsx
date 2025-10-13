import { Link } from "react-router-dom";

interface Props {
  id: number;
  name: string;
  imgUrl: string;
}

export default function ChampSquare({ id, name, imgUrl }: Props) {
  return (
    <div className="flex flex-col text-center text-lg">
      <Link to={`/:"${id}"`} className="aspect-square border border-amber-400">
        <img src={imgUrl} alt={name} className="" />
      </Link>
      {name}
    </div>
  );
}
