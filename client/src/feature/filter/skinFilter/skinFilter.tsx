import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export default function SkinFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [term, setValue] = useState(query || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams((prev) => ({ ...prev, q: term }));
  };

  return (
    <div className="py-5 sm:px-5">
      <form
        className="bg-white px-1 py-2 flex items-center w-[250px] sm:w-[330px]"
        onSubmit={handleSearch}
      >
        <input
          className="bg-white text-black text-lg sm:text-2xl"
          type="text"
          placeholder="Search Skin"
          value={term}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="bg-center-sqr bg-size-[70%] bg-[url(assets/search.svg)] h-[25px] sm:h-[30px]"
          type="submit"
          aria-label="Search Skin"
        />
      </form>
    </div>
  );
}
