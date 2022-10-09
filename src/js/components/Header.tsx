import { useAuth } from "../contexts/AuthContext";
import PrimaryButton from "./PrimaryButton";

export default function Header() {
  const { signOut, currentUser } = useAuth();

  return (
    <div className="header">
      hi, {currentUser?.email}
      <PrimaryButton onClick={signOut}>Log out</PrimaryButton>
    </div>
  );
}
