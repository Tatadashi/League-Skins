import { Link } from "react-router-dom";

interface Props {
  id: number;
  name: string;
  imgUrl: string;
}

export default function ChampSquare({ id, name, imgUrl }: Props) {
  return (
    <div className="flex flex-col text-center text-md text-tan">
      <Link to={`/:"${id}"`} className="aspect-square border border-tan">
        <img src={imgUrl} alt={name} />
      </Link>
      {name}
    </div>
  );
}
