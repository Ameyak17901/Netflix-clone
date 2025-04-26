import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/home/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import WatchPage from "./pages/WatchPage.tsx";
import SearchHistoryPage from "./pages/SearchHistoryPage.tsx";

import Footer from "./components/footer.tsx";

import { useAuthStore } from "./store/authUser.ts";
import { User } from "./models/user.ts";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import SearchPage from "./pages/SearchPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";

type AuthProps = {
  user: User | null;
  isAuthCheck: boolean;
  authCheck: () => Promise<void>;
};

function App() {
  const { user, isAuthCheck, authCheck } = useAuthStore() as AuthProps;

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isAuthCheck) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin size-10 text-red-600" />
        </div>
      </div>
    );
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/watch/:id"
          element={user ? <WatchPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/search"
          element={user ? <SearchPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/history"
          element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />}
        />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
      <Footer />
    </>
  );
}

export default App;
