import Login from "../../pages/Login";
import { AuthProvider } from "@/contexts/AuthContext";

export default function LoginExample() {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
}
