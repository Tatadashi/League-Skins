export default function Title() {
  return (
    <div className="bg-white dark:bg-black flex-center flex-col relative p-4">
      <div className="absolute top-3">
        <div className="relative">
          <h1 className="title-text absolute top-0 right-15">League</h1>
          <img
            className="h-10 w-10 invert dark:invert-0 "
            src="src/assets/titleSpark.png"
            alt=""
          />
          <h1 className="title-text absolute top-0 left-15">Skins</h1>
        </div>
      </div>
      <div className="h-[4vh] md:h-[20vh] lg:h-[32vh] md:flex">
        <div className="title-sword invisible md:visible" />
      </div>
    </div>
  );
}
