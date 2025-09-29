import Link from "next/link";
import LoginPage from "./Login/page";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-100">
      <LoginPage />
    </div>
  );
}
