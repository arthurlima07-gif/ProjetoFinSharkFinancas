import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCompanyProfileAPI,
  getStockQuoteAPI,
} from "../../services/StockService";
import type { CompanyProfile, StockQuote } from "../../models/Stock";
import Spinner from "../../components/Spinner/Spinner";

const StockPage = () => {
  const { ticker } = useParams<{ ticker: string }>();
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [quote, setQuote] = useState<StockQuote | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!ticker) return;
      setIsLoading(true);
      const [profileData, quoteData] = await Promise.all([
        getCompanyProfileAPI(ticker),
        getStockQuoteAPI(ticker),
      ]);
      setProfile(profileData);
      setQuote(quoteData);
      setIsLoading(false);
    };
    fetchData();
  }, [ticker]);

  if (isLoading) return <Spinner />;

  if (!profile) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-2xl text-gray-500">Company not found: {ticker}</h2>
      </div>
    );
  }

  const change = quote?.d ?? 0;
  const isPositive = change >= 0;

  return (
    <div className="container mx-auto p-8">

      {/* HEADER */}
      <div className="flex items-center space-x-4 mb-8">
        {profile.logo && (
          <img
            src={profile.logo}
            alt={profile.name}
            className="w-16 h-16 rounded-full object-contain bg-white shadow p-1"
          />
        )}
        <div>
          <h1 className="text-4xl font-bold text-darkBlue">{profile.name}</h1>
          <p className="text-gray-500 text-lg">
            {ticker?.toUpperCase()} · {profile.exchange}
          </p>
        </div>
      </div>

      {/* QUOTE CARDS */}
      {quote && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">

          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Current Price</p>
            <p className="text-xl font-bold text-darkBlue">${quote.c.toFixed(2)}</p>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Change</p>
            <p className={`text-xl font-bold ${isPositive ? "text-green-500" : "text-red-500"}`}>
              {isPositive ? "+" : ""}{change.toFixed(2)} ({quote.dp?.toFixed(2)}%)
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">High</p>
            <p className="text-xl font-bold text-darkBlue">${quote.h.toFixed(2)}</p>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Low</p>
            <p className="text-xl font-bold text-darkBlue">${quote.l.toFixed(2)}</p>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Open</p>
            <p className="text-xl font-bold text-darkBlue">${quote.o.toFixed(2)}</p>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Prev Close</p>
            <p className="text-xl font-bold text-darkBlue">${quote.pc.toFixed(2)}</p>
          </div>

        </div>
      )}

      {/* COMPANY INFO */}
      <div className="bg-white shadow-sm rounded-xl border border-gray-100 p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-darkBlue">Company Info</h2>
        <div className="space-y-3 text-sm">

          <div className="flex justify-between">
            <span className="text-gray-400 font-medium">Industry</span>
            <span className="text-gray-700">{profile.finnhubIndustry || "N/A"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400 font-medium">Country</span>
            <span className="text-gray-700">{profile.country || "N/A"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400 font-medium">Currency</span>
            <span className="text-gray-700">{profile.currency || "N/A"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400 font-medium">IPO Date</span>
            <span className="text-gray-700">{profile.ipo || "N/A"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400 font-medium">Market Cap</span>
            <span className="text-gray-700">
              ${(profile.marketCapitalization * 1_000_000).toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400 font-medium">Shares Outstanding</span>
            <span className="text-gray-700">
              {profile.shareOutstanding?.toLocaleString() || "N/A"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400 font-medium">Phone</span>
            <span className="text-gray-700">{profile.phone || "N/A"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400 font-medium">Website</span>
            
              href={profile.weburl}
              target="_blank"
              rel="noreferrer"
              className="text-lightBlue hover:underline"
            <a>
              {profile.weburl}
            </a>
          </div>

        </div>
      </div>

    </div>
  );
};

export default StockPage;