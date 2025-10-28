import { Link } from "react-router-dom";

interface Props {
  name: string;
  page: string;
  imgUrl: string;
}

export default function LinkBox({ name, page, imgUrl }: Props) {
  const links: { [page: string]: string } = {
    home: "bg-[url(assets/home.svg)]",
    favorite: "bg-[url(assets/favorite.svg)]",
    collection: "bg-[url(assets/collection.svg)]",
    about: "bg-[url(assets/about.svg)]",
  };
  return (
    <Link
      to={page}
      className="aspect-square ${links[imgUrl]} bg-cover focus:bg-blue-300 hover:bg-blue-300 dark:focus:bg-black dark:hover:bg-black flex-col flex-center gap-3 rounded-3xl text-sm text-center"
      aria-label={name}
    >
      <div
        className={`bg-size-[60%] bg-no-repeat bg-center ${links[imgUrl]} bg-cover dark:invert h-[60px] w-[80px]`}
      />
      {name}
    </Link>
  );
}
