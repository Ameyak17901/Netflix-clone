import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function AuthScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/signup?email=${email}`, {
      state: { email },
    });
  };
  return (
    <div className="hero-bg relative">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
        <img
          src="/netflix-logo.png"
          alt="netflix-logo"
          className="w-32 md:w-52"
        />
        <Link to={"/login"} className="text-white bg-red-600 rounded px-2 py-1">
          Login
        </Link>
      </header>
      <div className="flex flex-col items-center justify-center text-center py-40 text-white mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Unlimited movies, TV shows, and more.
        </h1>
        <p className="text-lg mb-4">Watch anywhere. Cancel Anytime.</p>
        <p className="mb-4">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <form
          className="flex flex-col md:flex-row gap-4 w-1/2"
          onSubmit={handleFormSubmit}
        >
          <input
            type="email"
            placeholder="Email Address"
            className="p-2 rounded flex-1 bg-black/80 border border-gray-700"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 lg:py-2 rounded flex justify-center items-center">
            Get Started <ChevronRight className="size-8 md:size-10" />
          </button>
        </form>
      </div>
      {/* seperator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

      {/* 1st section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center flex-col md:flex-row px-4 md:ps-2">
          {/* left side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Enjoy on your TV.
            </h2>
            <p className="text-lg md:text-xl ">
              Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV,
              Blu-ray players, and more.
            </p>
          </div>
          {/* right side */}
          <div className="flex-1 relative overflow-hidden">
            <img src="/tv.png" alt="tv" className="mt-4 relative z-20" />
            <video
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-1/2"
              loop
              muted
              autoPlay={true}
              playsInline
            >
              <source src="/hero-vid.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* seperator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />
      {/* 2nd section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:ps-2">
          {/* left side */}
          <div className="flex-1">
            <div className="relative">
              <img
                src="/stranger-things-lg.png"
                alt="stranger things img"
                className="mt-4"
              />
              <div className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2">
                <img
                  src="/stranger-things-sm.png"
                  alt="stranger things sm img"
                  className="h-full"
                />
                <div className="flex justify-between">
                  <div className="flex flex-col gap-0">
                    <span className="text-md lg:text-lg font-bold">
                      Stranger Things
                    </span>
                    <span className="text-sm text-blue-500">
                      Downloading...
                    </span>
                  </div>
                  <img
                    src="/download-icon.gif"
                    alt="download icon"
                    className="h-12"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* right ide */}
          <div className="flex-1 md:text-left text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
              Download your shows to watch offline.
            </h2>
            <p className="text-lg md:text-xl">
              Save your favourites easily and always have something to watch.
            </p>
          </div>
        </div>
      </div>

      {/* seperator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />
      {/* 3rd section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center flex-col md:flex-row px-4 md:ps-2">
          {/* left side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Watch everywhere.
            </h2>
            <p className="text-lg md:text-xl ">
              Stream ulimited movies and TV shows on your phone, tablet, laptop,
              and TV.
            </p>
          </div>
          {/* right side */}
          <div className="flex-1 relative">
            <img
              src="/device-pile.png"
              alt="device image"
              className="mt-4 relative z-20"
            />
            <video
              className="absolute top-2 left-1/2 -translate-x-1/2  z-10 h-4/6 max-w-[63%]"
              loop
              muted
              autoPlay={true}
              playsInline
            >
              <source src="/video-devices.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />
      {/* 4th section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-s-6xl mx-auto items-center justify-center flex-col-reverse md:flex-row px-4 md:px-2">
          {/* left side */}
          <div className="flex-1 relative">
            <img src="/kids.png" alt="Enjoy on the tv" className="mt-4" />
          </div>
          {/* right side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Create profiles for kids.
            </h2>
            <p className="text-lg md:text-xl">
              Send kids on adventures with their favourite characters in a space
              made just for them-free with your membership.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
