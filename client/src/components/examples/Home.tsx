import Home from "../../pages/Home";
import { AuthProvider } from "@/contexts/AuthContext";

export default function HomeExample() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
}
