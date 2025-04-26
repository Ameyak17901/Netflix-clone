import { User } from "../../models/user";
import { useAuthStore } from "../../store/authUser";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

type AuthProps = {
  user: User | null;
};

export default function HomePage() {
  const { user } = useAuthStore() as AuthProps;
  return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
}
