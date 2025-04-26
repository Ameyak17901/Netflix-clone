import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";

import { Movie, Trailer, TvShow } from "../models/content";
import { Content } from "../models/content";

import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";

type ContentParams = {
  contentType: string;
};

function formatReleaseDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function WatchPage() {
  const { id } = useParams();
  const [trailers, setTrailers] = useState<Array<Trailer>>([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showArrows, setShowArrows] = useState<boolean>(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  const [content, setContent] = useState<Content>();
  const [similarContent, setSimilarContent] = useState<Array<Content>>([]);
  const { contentType } = useContentStore() as ContentParams;

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    if (currentTrailerIdx < trailers.length - 1) {
      setCurrentTrailerIdx(currentTrailerIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentTrailerIdx > 0) {
      setCurrentTrailerIdx(currentTrailerIdx - 1);
    }
  };

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const response = await axios.get(
          `/api/v1/${contentType}/${id}/trailers`
        );
        setTrailers(response.data.content);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.message.includes("404")) {
            setTrailers([]);
          }
        }
      }
    };
    getTrailers();
  }, [contentType, id]);
  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const response = await axios.get(
          `/api/v1/${contentType}/${id}/similar`
        );
        setSimilarContent(response.data.content);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.message.includes("404")) {
            setSimilarContent([]);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };
    getSimilarContent();
  }, [contentType, id]);
  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const response = await axios.get(
          `/api/v1/${contentType}/${id}/details`
        );
        setContent(response.data.content);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.message.includes("404")) {
            setContent(undefined);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };
    getContentDetails();
  }, [contentType, id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />
        {trailers.length > 0 && (
          <div className="flex items-center justify-between">
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white px-4 py-2 rounded ${
                currentTrailerIdx === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentTrailerIdx === 0}
            >
              <ChevronLeft size={24} onClick={handlePrev} />
            </button>
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white px-4 py-2 rounded ${
                currentTrailerIdx === trailers?.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={currentTrailerIdx === trailers?.length - 1}
            >
              <ChevronRight size={24} onClick={handleNext} />
            </button>
          </div>
        )}
        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
          {trailers.length > 0 && (
            <ReactPlayer
              controls={true}
              width="100%"
              height={"70vh"}
              className="mx-auto overflow-hidden rounded-lg"
              url={`https://youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
            />
          )}
          {trailers?.length === 0 && (
            <h2 className="text-xl text-center mt-5">
              No Trailers available for{" "}
              <span className="font-bold text-red-600">
                {(content as Movie)?.title || (content as TvShow)?.name}
              </span>
            </h2>
          )}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
          <div className="mb-4 md:mb-0">
            <h1 className="text-5xl font-bold text-balance">
              {(content as Movie)?.title || (content as TvShow)?.name}
            </h1>
            <p className="mt-2 text-lg">
              {formatReleaseDate(
                (content as Movie)?.release_date ||
                  (content as TvShow)?.first_air_date
              )}{" "}
              |{" "}
              {content?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}
            </p>
            <p className="mt-2 text-lg">{(content as Movie|TvShow)?.overview}</p>
          </div>
          <img
            src={`${ORIGINAL_IMG_BASE_URL}${(content as Movie|TvShow)?.poster_path}`}
            alt="Poster image"
            className="max-h-[600px] rounded-md"
          />
        </div>
        {similarContent?.length > 0 && (
          <div className="mt-12 max-w-6xl mx-auto relative">
            <h3 className="text-3xl font-bold mb-4">Similar Movies/Tv shows</h3>
            <div
              className="flex overflow-x-scroll scrollbar-hide pb-4 gap-4 group"
              onMouseEnter={() => setShowArrows(true)}
              onMouseLeave={() => setShowArrows(false)}
              ref={sliderRef}
            >
              {similarContent?.map((item: Content) => {
                if ((item as Movie|TvShow).poster_path === null) return null;
                return (
                  <>
                    <Link
                      to={`/watch/${item.id}`}
                      key={item.id}
                      className="w-52 flex-none"
                    >
                      <img
                        src={`${SMALL_IMG_BASE_URL}${(item as Movie|TvShow).poster_path}`}
                        alt="poster image"
                      />
                      <h4 className="text-center mt-2 text-lg font-semibold">
                        {(item as Movie)?.title || (item as TvShow)?.name}
                      </h4>
                    </Link>
                  </>
                );
              })}
              {showArrows && (
                <>
                  <button className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 size-12 flex justify-center items-center rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10">
                    <ChevronLeft size={24} onClick={slideLeft} />
                  </button>
                  <button className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 size-12 flex justify-center items-center rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10">
                    <ChevronRight size={24} onClick={slideRight} />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
