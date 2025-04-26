export type Movie = {
  id: string;
  backdrop_path: string;
  adult: boolean;
  genre_ids: number[];
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
export type TvShow = {
  id: string;
  backdrop_path: string;
  adult: boolean;
  genre_ids: number[];
  media_type: string;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name?: string;
  vote_average: number;
  vote_count: number;
};

export type Trailer = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
};

export type Person = {
  id: string;
  adult: boolean;
  gender: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  known_for: Content[];
};

export type Content = Movie | TvShow | Person;
