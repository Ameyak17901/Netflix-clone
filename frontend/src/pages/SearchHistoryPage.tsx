import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { SearchHistory } from "../models/user";
import { Trash } from "lucide-react";

const formatDate = (date: string) => {
  console.log(date);
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
};

export default function SearchHistryPage() {
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>();

  useEffect(() => {
    async function getSearchHistory() {
      try {
        const response = await axios.get("/api/v1/search/history");
        setSearchHistory(response.data.content);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.message.includes("404")) {
            toast.error("No search history found");
          }
          setSearchHistory([]);
        }
      }
    }
    getSearchHistory();
  }, [setSearchHistory]);

  const handleDelete = async (entry: SearchHistory) => {
    try {
      await axios.delete(`/api/v1/search/history/${entry.id}`);
      setSearchHistory(searchHistory?.filter((item) => item.id !== entry.id));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error("Error delete search history item");
      }
    }
  };
  if (!searchHistory || searchHistory.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search History</h1>
          <div className="flex items-center justify-center h-96">
            <p className="text-xl">No search history found...</p>
          </div>
        </div>
      </div>
    );
  }

  console.log(searchHistory);

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search History</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchHistory.map((entry: SearchHistory) => (
            <div
              className="bg-gray-800 p-4 rounded flex items-start gap-1"
              key={entry?.id}
            >
              <img
                src={`${SMALL_IMG_BASE_URL}${entry?.image}`}
                alt="poster image"
                className="size-12 rounded-full object-cover mr-4"
              />
              <div className="flex flex-col">
                <span className="text-white text-md">{entry.title}</span>
                <span className="text-gray-400 text-sm">
                  {formatDate(entry?.createdAt)}
                </span>
              </div>
              <span
                className={`py-1 px-2 min-w-24 text-center rounded-full text-sm ml-auto ${
                  entry.searchType === "movie"
                    ? "bg-red-600"
                    : entry?.searchType === "tvShow"
                    ? "bg-blue-600"
                    : "bg-green-600"
                }`}
              >
                {entry?.searchType[0].toUpperCase() +
                  entry?.searchType.slice(1)}
              </span>
              <Trash
                className="size-14 ml-4 hover:fill-red-600 hover:text-red-600 cursor-pointer"
                onClick={() => handleDelete(entry)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
