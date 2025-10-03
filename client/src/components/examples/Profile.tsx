import Profile from "../../pages/Profile";
import { AuthProvider } from "@/contexts/AuthContext";

export default function ProfileExample() {
  return (
    <AuthProvider>
      <Profile />
    </AuthProvider>
  );
}
