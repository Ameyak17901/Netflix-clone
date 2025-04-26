import { DateUnit } from "mongoose";

export interface SignUpCredentials {
  email: string;
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  image: string;
  searchHistory: string[];
}

export type SearchHistory = {
  id: string;
  image: string;
  title: string;
  searchType: string;
  createdAt: DateUnit;
};

export interface LoginCredentials {
  email: string;
  password: string;
}
