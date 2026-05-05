import { type ChangeEvent, type SyntheticEvent, useState } from "react";
import { searchStocksAPI } from "../../services/StockService";
import type { SearchResult } from "../../models/Stock";
import CardList from "../../components/CardList/CardList";
import Spinner from "../../components/Spinner/Spinner";

const SearchPage = () => {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setServerError("");

    const result = await searchStocksAPI(search);

    if (result) {
      setSearchResult(
        result.result
          .filter((r) => r.type === "Common Stock")
          .slice(0, 20)
      );
    } else {
      setServerError("Could not find any results. Please try again.");
    }

    setIsLoading(false);
  };

  const onPortfolioCreate = (symbol: string) => {
    console.log("Add to portfolio:", symbol);
  };

  return (
    <div className="App">
      <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <div className="w-full p-10 xl:px-68 lg:px-12">
          <div className="relative flex flex-col items-center justify-center space-y-6">

            <form
              className="flex flex-col w-full lg:flex-row"
              onSubmit={onSearchSubmit}
            >
              <input
                className="w-full py-3 pl-4 pr-4 text-gray-600 border border-gray-200 rounded-lg focus:outline-none"
                placeholder="Search company or ticker (e.g. Apple, AAPL)..."
                value={search}
                onChange={handleSearchChange}
              />
              <button
                type="submit"
                className="w-full py-3 mt-4 text-white font-semibold bg-lightBlue rounded-lg lg:mt-0 lg:ml-2 hover:opacity-70 transition lg:w-auto lg:px-12"
              >
                Search
              </button>
            </form>

            {serverError && (
              <p className="text-red-500">{serverError}</p>
            )}

            {isLoading ? (
              <Spinner />
            ) : (
              <CardList
                searchResults={searchResult}
                onPortfolioCreate={onPortfolioCreate}
              />
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;