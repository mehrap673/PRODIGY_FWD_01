import Register from "../../pages/Register";
import { AuthProvider } from "@/contexts/AuthContext";

export default function RegisterExample() {
  return (
    <AuthProvider>
      <Register />
    </AuthProvider>
  );
}
