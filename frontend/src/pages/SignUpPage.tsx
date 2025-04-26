import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { SignUpCredentials } from "../models/user";
type authParams = {
  signup: (val: SignUpCredentials) => Promise<string>;
  isSignUp: boolean;
};

export default function SignUpPage() {
  const { searchParams } = new URL(document.location.href);
  const emailValue = searchParams.get("email");
  const [formData, setFormData] = useState({
    email: emailValue || "",
    username: "",
    password: "",
  });

  const { signup, isSignUp } = useAuthStore((state) => state) as authParams;

  const handleSignup = (e: React.FormEvent): void => {
    e.preventDefault();
    signup({ ...formData });
    console.log(formData);
  };
  return (
    <div className="hero-bg h-screen w-full">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="netflix logo" className="w-52" />
        </Link>
      </header>
      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            Sign Up
          </h1>
          <form className="space-y-4" onSubmit={handleSignup}>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300 block"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="you@example.com"
                id="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-300 block"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="samsmith"
                id="username"
                value={formData.username}
                onChange={(e) => {
                  setFormData({ ...formData, username: e.target.value });
                }}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 block"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="********"
                id="password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              />
            </div>
            <button className="w-full py-2 text-white rounded-md bg-red-600 hover:bg-red-700 font-semibold">
              {isSignUp ? "Loading..." : "Sign Up"}
            </button>
          </form>
          <div className="text-center text-gray-400">
            Already have an account?{" "}
            <Link to={"/login"} className="text-red-500 hover:underline">
              Login In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
