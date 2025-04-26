import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

type ContentParams = {
  contentType: string;
};

export default function useGetTrendingContent() {
  const [content, setContent] = useState(null);

  const { contentType } = useContentStore() as ContentParams;

  useEffect(() => {
    const getTrendingContent = async () => {
      try {
        console.log(contentType);
        const response = await axios.get(`/api/v1/${contentType}/trending`);
            
        setContent(response.data.content);
      } catch (error) {
        console.log(error);
      }
    };
    getTrendingContent();
  }, [contentType]);

  return { content };
}
