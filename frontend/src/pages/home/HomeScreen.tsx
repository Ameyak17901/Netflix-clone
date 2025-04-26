import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Slider from "../../components/Slider";
import { Info, Play } from "lucide-react";
import useGetTrendingContent from "../../hooks/useGetTrendingContent";
import {
  MOVIE_CATEGORY,
  ORIGINAL_IMG_BASE_URL,
  TVSHOW_CATEGORY,
} from "../../utils/constants.ts";
import { Content, Movie, TvShow } from "../../models/content.ts";
import { useContentStore } from "../../store/content.ts";
import { useState } from "react";
type TrendingContentParams = {
  content: Content | null;
};

type ContentParams = {
  contentType: string;
};

export default function HomeScreen() {
  const { content } = useGetTrendingContent() as TrendingContentParams;
  const { contentType } = useContentStore() as ContentParams;
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  if (!content) {
    return (
      <div className="h-screen bg-black text-white">
        <Navbar />
        <div className="absolute flex top-0 bg-black/70 left-0 h-full w-full justify-center items-center shimmer -z-10" />
      </div>
    );
  }
  return (
    <>
      <div className="relative h-screen text-white">
        <Navbar />
        {isImageLoading && (
          <div className="absolute flex top-0 bg-black/70 left-0 h-full w-full justify-center items-center shimmer -z-10" />
        )}
        <img
          src={`${ORIGINAL_IMG_BASE_URL}${
            (content as Movie | TvShow)?.backdrop_path
          }`}
          alt="hero-bg"
          className="absolute top-0 left-0 h-full w-full object-cover -z-50"
          aria-hidden="true"
          onLoad={() => setIsImageLoading(false)}
        />
        <div className="absolute top-0 left-0 h-full w-full bg-black/50 -z-50" />
        <div className="absolute flex top-0 left-0 h-full w-full flex-col justify-center px-8 md:px-16 lg:px-32">
          <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full left-0 top-0 -z-10" />
          <div className="max-w-2xl">
            <h1 className="text-6xl text-balance mt-4 font-extrabold">
              {(content as Movie).title || (content as TvShow).name}
            </h1>
            <p className="text-lg mt-4">
              {(content as Movie)?.release_date?.split("-")[0] ||
                (content as TvShow)?.first_air_date?.split("-")[0]}{" "}
              | {content?.adult ? "18+" : "PG-13"}
            </p>
            <p className="text-lg mt-4">
              {(content as Movie | TvShow)?.overview}
            </p>
          </div>
          <div className="flex mt-8">
            <Link
              to={`/watch/${content.id}`}
              className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center"
            >
              <Play className="size-6 mr-2 fill-black" />
              Play
            </Link>
            <Link
              to={`/watch/${content.id}`}
              className="bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center"
            >
              <Info className="size-6 mr-2" />
              More Info
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-black gap-10 py-10">
        {contentType === "movie"
          ? MOVIE_CATEGORY.map((category) => (
              <Slider key={category} category={category} />
            ))
          : TVSHOW_CATEGORY.map((category) => (
              <Slider key={category} category={category} />
            ))}
      </div>
    </>
  );
}
