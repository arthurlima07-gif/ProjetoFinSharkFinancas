import type { SearchResult } from "../../models/Stock";
import Card from "../Card/Card";

interface Props {
  searchResults: SearchResult[];
  onPortfolioCreate: (symbol: string) => void;
}

const CardList = ({ searchResults, onPortfolioCreate }: Props) => {
  return (
    <div className="flex flex-col space-y-4 w-full">
      {searchResults.length > 0 ? (
        searchResults.map((result) => (
          <Card
            key={result.symbol}
            id={result.symbol}
            searchResult={result}
            onPortfolioCreate={onPortfolioCreate}
          />
        ))
      ) : (
        <p className="text-center text-gray-500 mt-8">
          No results found. Try searching for a stock symbol or company name.
        </p>
      )}
    </div>
  );
};

export default CardList;