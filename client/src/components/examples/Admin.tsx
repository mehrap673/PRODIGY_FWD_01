import Admin from "../../pages/Admin";
import { AuthProvider } from "@/contexts/AuthContext";

export default function AdminExample() {
  return (
    <AuthProvider>
      <Admin />
    </AuthProvider>
  );
}
