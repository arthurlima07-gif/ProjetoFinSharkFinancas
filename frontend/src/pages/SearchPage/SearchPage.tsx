import { type ChangeEvent, type SyntheticEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { searchStocksAPI } from "../../services/StockService";
import {
  addPortfolioAPI,
  deletePortfolioAPI,
  getPortfolioAPI,
} from "../../services/PortfolioService";
import type { SearchResult } from "../../models/Stock";
import type { PortfolioGet } from "../../models/Portfolio";
import CardList from "../../components/CardList/CardList";
import Portfolio from "../../components/Portfolio/Portfolio";
import Spinner from "../../components/Spinner/Spinner";

const SearchPage = () => {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>("");

  useEffect(() => {
    getPortfolioAPI()
      .then((res) => setPortfolioValues(res.data))
      .catch(() => {});
  }, []);

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

  const onPortfolioCreate = async (symbol: string) => {
    const alreadyIn = portfolioValues.find(
      (p) => p.symbol.toUpperCase() === symbol.toUpperCase()
    );
    if (alreadyIn) {
      toast.warning("Stock already in portfolio!");
      return;
    }
    await addPortfolioAPI(symbol)
      .then((res) => {
        toast.success("Added to portfolio!");
        setPortfolioValues([...portfolioValues, res.data]);
      })
      .catch(() => toast.warning("Could not add to portfolio."));
  };

  const onPortfolioDelete = async (symbol: string) => {
    await deletePortfolioAPI(symbol)
      .then(() => {
        toast.success("Removed from portfolio!");
        setPortfolioValues(
          portfolioValues.filter(
            (p) => p.symbol.toUpperCase() !== symbol.toUpperCase()
          )
        );
      })
      .catch(() => toast.warning("Could not remove from portfolio."));
  };

  return (
    <div className="App">
      <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">

        {/* PORTFOLIO */}
        <div className="w-full xl:px-68 lg:px-12 px-6 mb-6 mt-6">
          <h2 className="text-2xl font-bold mb-4">My Portfolio</h2>
          {portfolioValues.length > 0 ? (
            <div className="flex flex-col space-y-2">
              {portfolioValues.map((p) => (
                <Portfolio
                  key={p.symbol}
                  portfolioValue={p}
                  onPortfolioDelete={onPortfolioDelete}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">
              Your portfolio is empty. Search and add stocks below.
            </p>
          )}
        </div>

        {/* SEARCH */}
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

            {serverError && <p className="text-red-500">{serverError}</p>}

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