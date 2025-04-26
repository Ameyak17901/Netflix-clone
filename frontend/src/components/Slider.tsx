import { useEffect, useRef, useState } from "react";
import { Content, Movie, TvShow } from "../models/content";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

type SliderParams = {
  category: string;
};
type ContentParams = {
  contentType: string;
};

export default function Slider({ category }: SliderParams) {
  const [content, setContent] = useState<Array<Content>>([]);
  const { contentType } = useContentStore() as ContentParams;
  const [showArrows, setShowArrows] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const formattedCategoryName =
    category.split("_").join(" ").charAt(0).toUpperCase() +
    category.split("_").join(" ").slice(1).toLowerCase();

  const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

  useEffect(() => {
    async function getContent() {
      const response = await axios.get(`/api/v1/${contentType}/${category}`);
      setContent(response.data.content);
    }
    getContent();
  }, [contentType, category]);

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

  if (!content) {
    return (
      <div className="h-screen text-white">
        <div className="absolute flex top-0 bg-black/70 left-0 h-full w-full justify-center items-center shimmer -z-10" />
      </div>
    );
  }
  return (
    <div
      className="bg-black text-white relative px-5 md:px-20"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="mb-4 text-2xl font-bold">
        {formattedCategoryName} {formattedContentType}
      </h2>
      <div
        className="flex space-x-4 overflow-x-scroll scrollbar-hide"
        ref={sliderRef}
      >
        {content?.map((item: Content) => (
          <Link
            to={`/watch/${item.id}`}
            key={item.id}
            className="min-w-[250px] relative group"
          >
            <div className="rounded-lg overflow-hidden">
              <img
                src={`${SMALL_IMG_BASE_URL}${
                  (item as TvShow | Movie)?.backdrop_path
                }`}
                className="transition-transform duration-300 ease-in-out group-hover:scale-125"
              />
            </div>
            <p className="mt-2 text-center">
              {(item as Movie).title || (item as TvShow).name}
            </p>
          </Link>
        ))}
      </div>
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
  );
}
