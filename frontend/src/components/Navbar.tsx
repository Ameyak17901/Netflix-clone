import { LogOut, Menu, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/authUser";
import { User } from "../models/user";
import { useContentStore } from "../store/content";

type NavbarParams = {
  user: User | null;
  logout: () => Promise<void>;
};

type ContentParams = {
  setContentType: (type: string) => void;
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { user, logout } = useAuthStore() as NavbarParams;
  const { setContentType } = useContentStore() as ContentParams;

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-3 h-20">
      <div className="flex items-center gap-10 z-50">
        <Link to={"/"}>
          <img
            src="/netflix-logo.png"
            alt="netflix logo"
            className="w-32 md:w-40"
          />
        </Link>
        <div className="hidden sm:flex gap-4 items-center">
          <Link
            to={"/"}
            className="hover:underline"
            onClick={() => setContentType("movie")}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="hover:underline"
            onClick={() => setContentType("tv")}
          >
            Tv Shows
          </Link>
          <Link to={"/history"} className="hover:underline">
            {" "}
            Search History
          </Link>
        </div>
      </div>

      <div className="flex gap-2 items-center z-50">
        <Link to={"/search"}>
          <Search className="size-6" />
        </Link>
        <img
          src={user ? `${user.image.slice(1)}` : "/avaatar.png"}
          alt="Avaatar"
          className="h-8 cursor-pointer"
        />
        <LogOut className="size-6 cursor-pointer" onClick={logout} />

        <div className="sm:hidden">
          <Menu
            className="size-6 cursor-pointer"
            onClick={handleMobileMenuToggle}
          />
        </div>
      </div>
      {/* Mobile Navbar items */}
      {isMobileMenuOpen && (
        <div className="w-full mt-4 bg-black rounded border border-gray-500 sm:hidden z-50">
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={() => setContentType("movie")}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={() => setContentType("tv")}
          >
            Tv Shows
          </Link>
          <Link to={"/history"} className="block hover:underline p-2">
            Search History
          </Link>
        </div>
      )}
    </header>
  );
}
