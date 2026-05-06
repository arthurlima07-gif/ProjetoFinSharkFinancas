import { Link } from "react-router-dom";
import type { SearchResult } from "../../models/Stock";

interface Props {
  id: string;
  searchResult: SearchResult;
  onPortfolioCreate: (symbol: string) => void;
}

const Card = ({ id, searchResult, onPortfolioCreate }: Props) => {
  return (
    <div
      className="flex flex-col items-center justify-between w-full p-6 bg-slate-100 rounded-lg md:flex-row"
      key={id}
    >
      <Link to={`/company/${searchResult.symbol}`} className="flex-1">
        <h2 className="font-bold text-center md:text-left text-gray-800 text-lg">
          {searchResult.description}
        </h2>
        <p className="text-center md:text-left text-gray-500 font-semibold">
          {searchResult.symbol}
        </p>
        <p className="text-center md:text-left text-gray-400 text-sm">
          {searchResult.type}
        </p>
      </Link>
      <div className="flex flex-col mt-4 space-y-2 md:flex-row md:space-y-0 md:space-x-3 md:mt-0">
        <button
          onClick={() => onPortfolioCreate(searchResult.symbol)}
          className="px-5 py-2 font-semibold text-white bg-lightBlue rounded-full hover:opacity-70 transition"
        >
          Add to Portfolio
        </button>
      </div>
    </div>
  );
};

export default Card;