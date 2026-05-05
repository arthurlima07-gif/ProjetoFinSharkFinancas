import { Link } from "react-router-dom";
import type { PortfolioGet } from "../../models/Portfolio";

interface Props {
  portfolioValue: PortfolioGet;
  onPortfolioDelete: (symbol: string) => void;
}

const Portfolio = ({ portfolioValue, onPortfolioDelete }: Props) => {
  return (
    <div className="flex flex-col items-center justify-between w-full p-6 bg-slate-100 rounded-lg md:flex-row">
      <Link
        to={`/company/${portfolioValue.symbol}`}
        className="font-bold text-center md:text-left text-gray-800 text-lg hover:text-lightBlue transition"
      >
        {portfolioValue.symbol}
      </Link>
      <button
        onClick={() => onPortfolioDelete(portfolioValue.symbol)}
        className="px-5 py-2 font-semibold text-white bg-red-500 rounded-full hover:opacity-70 transition mt-4 md:mt-0"
      >
        Remove
      </button>
    </div>
  );
};

export default Portfolio;