import { Link } from "react-router-dom";

interface Props {
  name: string;
  page: string;
  imgUrl: string;
}

export default function LinkBox({ name, page, imgUrl }: Props) {
  return (
    <Link
      to={page}
      className="aspect-square flex-col flex-center gap-3 focus:bg-blue-300 hover:bg-blue-300 dark:focus:bg-black dark:hover:bg-black rounded-3xl text-sm text-center"
      aria-label={name}
    >
      <img className="h-[50%] dark:invert" src={imgUrl} alt=""></img>
      {name}
    </Link>
  );
}
