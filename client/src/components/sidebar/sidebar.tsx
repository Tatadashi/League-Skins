import LinkBox from "./linkBox/linkBox";
export default function Sidebar() {
  return (
    <nav
      className="bg-blue-400 dark:bg-dusk-blue flex flex-col gap-10 pt-10 px-2"
      aria-label="Main navigation"
    >
      <LinkBox name="Home" page="/?q=" imgUrl="src/assets/home.svg" />
      <LinkBox name="Weekly Sales" page="/sale" imgUrl="src/assets/sale.svg" />
      <LinkBox
        name="Wishlist"
        page="/wishlist"
        imgUrl="src/assets/wishlist.svg"
      />
      <LinkBox
        name="Collection"
        page="/collection"
        imgUrl="src/assets/collection.svg"
      />
      <LinkBox name="About" page="/about" imgUrl="src/assets/about.svg" />
    </nav>
  );
}
