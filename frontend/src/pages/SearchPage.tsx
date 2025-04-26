import { useState } from "react";
import Navbar from "../components/Navbar";
import { useContentStore } from "../store/content";
import { Content, Movie, Person, TvShow } from "../models/content";
import { Search } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";

type ContentParams = {
  setContentType: (val: string) => void;
};

export default function SearchPage() {
  const { setContentType } = useContentStore() as ContentParams;
  const [activeTab, setActiveTab] = useState<string>("movie");

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<Content[]>([]);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `/api/v1/search/${activeTab}/${searchTerm}`
      );
      setResults(response.data.content);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.message.includes("404")) {
          toast.error(
            `No results found for ${searchTerm}, make sure you are search under right category`
          );
          setResults([]);
        } else {
          toast.error("error occured, please try again later");
        }
      }
    }
  };

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
    if (tab in ["movie", "tv"]) setContentType(tab);
    setResults([]);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center gap-3 mb-4">
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "movie" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700`}
            onClick={() => handleActiveTab("movie")}
          >
            Movies
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "tv" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700`}
            onClick={() => handleActiveTab("tv")}
          >
            TV Shows
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "person" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700`}
            onClick={() => handleActiveTab("person")}
          >
            People
          </button>
        </div>
        <form
          className="flex items-stretch gap-2 mb-2 max-w-2xl mx-auto "
          onSubmit={handleSearch}
        >
          <input
            className="w-full p-2 rounded bg-gray-700 text-white"
            type="text"
            placeholder={`Search for a ${activeTab}`}
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
          />
          <button className="bg-red-600 hover:bg-red-700 p-2 rounded">
            <Search className="size-6" />
          </button>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((result: Content) => {
            if (
              (result as Person)?.profile_path === null ||
              (result as Movie | TvShow)?.poster_path === null
            )
              return null;

            return (
              <div className="bg-gray-800 p-4 rounded" key={result.id}>
                {activeTab === "person" ? (
                  <Link to={`/actor/${(result as Person)?.name}`}>
                    <img
                      src={`${ORIGINAL_IMG_BASE_URL}${
                        (result as Person)?.profile_path
                      }`}
                      alt={`${(result as Person)?.name}`}
                      className="max-h-96 rounded mx-auto"
                    />
                    <h2 className="mt-2 text-xl font-bold">
                      {(result as Person)?.name}
                    </h2>
                  </Link>
                ) : (
                  <Link
                    to={`/watch/${(result as Movie | TvShow)?.id}`}
                    onClick={() => setContentType(activeTab)}
                  >
                    <img
                      src={`${ORIGINAL_IMG_BASE_URL}${
                        (result as Movie | TvShow)?.poster_path
                      }`}
                      alt={`${
                        (result as Movie)?.title || (result as TvShow)?.name
                      }`}
                      className="max-h-96 rounded mx-auto"
                    />
                    <h2 className="mt-2 text-xl font-bold">
                      {(result as Person)?.name}
                    </h2>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
