import type { Skin } from "../../../app/pages/collection/collection";
import SkinSquare from "./skinSquare/skinSquare";

interface SkinProps {
  skinList: Skin[] | undefined;
}

//squares are champSelect icons
export default function SkinDisplay({ skinList }: SkinProps) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,_120px)] grid-rows-[repeat(4,_220px)] gap-x-1 sm:gap-x-5 gap-y-5 lg:gap-y-8 h-[1015px] lg:py-5 sm:px-5 place-content-center-safe overflow-clip">
      {skinList &&
        skinList.map((skin: Skin, index) => (
          <div
            className="border border-black dark:border-tan bg-stone-300 dark:bg-dark-brown flex p-1"
            key={index}
          >
            <SkinSquare skin={skin} />
          </div>
        ))}
    </ul>
  );
}
