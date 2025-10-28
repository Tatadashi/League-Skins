import LinkBox from "./linkBox/linkBox";
export default function Sidebar() {
  return (
    <nav
      className="bg-blue-400 dark:bg-dusk-blue flex flex-col gap-10 pt-10 px-2"
      aria-label="Main navigation"
    >
      <LinkBox name="Home" page="/?q=" imgUrl="home" />
      {/* <LinkBox name="Weekly Sales" page="/sale" imgUrl="/src/assets/sale.svg" /> */}
      <LinkBox name="Favorite" page="/favorite" imgUrl="favorite" />
      <LinkBox name="Collection" page="/collection" imgUrl="collection" />
      <LinkBox name="About" page="/about" imgUrl="about" />
    </nav>
  );
}
