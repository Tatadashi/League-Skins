import type { SetStateAction } from "react";

interface PaginationProps {
  totalSkins: number;
  skinsPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
}

//clientside pagination will change later
export default function Pagination({
  totalSkins,
  skinsPerPage,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const pages: number[] = [];

  for (let i = 1; i <= Math.ceil(totalSkins / skinsPerPage); i++) {
    pages.push(i);
  }

  const paginate = (page: number, e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentPage(page);
  };

  const isActive = (page: number) => {
    if (currentPage === page) {
      return "text-white bg-navy-blue rounded-lg";
    }
    return "";
  };

  //show 5 pages nearest to currentPage
  const showCurrentPages = () => {
    if (currentPage <= 3 && pages.length >= 5) {
      return pages.slice(0, 5);
    } else if (currentPage > 3 && pages.length >= currentPage + 2) {
      return pages.slice(currentPage - 3, currentPage + 2);
    } else if (currentPage + 2 === pages.length) {
      return pages.slice(currentPage - 3);
    } else if (currentPage + 1 === pages.length) {
      return pages.slice(currentPage - 4);
    } else if (currentPage === pages.length) {
      return pages.slice(currentPage - 5);
    }
    return pages;
  };

  const decrementPage = () => {
    if (currentPage > 1) {
      return currentPage - 1;
    }
    return currentPage;
  };

  const incrementPage = () => {
    if (currentPage !== pages.length) {
      return currentPage + 1;
    }
    return currentPage;
  };

  return (
    <nav>
      <ul className="flex flex-row px-5" aria-label="page">
        <li className="flex-center bg-white p-1">
          <a
            onClick={(e) => paginate(decrementPage(), e)}
            aria-label={`go to previous page`}
            href="#"
            className=" p-1 px-2 text-black hover:text-white hover:bg-dusk-blue hover:rounded-lg focus:text-white focus:bg-dusk-blue focus:rounded-lg"
          >
            {"<"}
          </a>
        </li>
        {showCurrentPages().map((number) => (
          <li key={number} className="flex-center bg-white p-1">
            <a
              onClick={(e) => paginate(number, e)}
              aria-label={`go to page ${number}`}
              href="#"
              className={`${isActive(number)} p-1 px-2 text-black hover:text-white hover:bg-dusk-blue hover:rounded-lg focus:text-white focus:bg-dusk-blue focus:rounded-lg`}
            >
              {number}
            </a>
          </li>
        ))}
        <li className="flex-center bg-white p-1">
          <a
            onClick={(e) => paginate(incrementPage(), e)}
            aria-label={`go to next page`}
            href="#"
            className=" p-1 px-2 text-black hover:text-white hover:bg-dusk-blue hover:rounded-lg focus:text-white focus:bg-dusk-blue focus:rounded-lg"
          >
            {">"}
          </a>
        </li>
      </ul>
    </nav>
  );
}
