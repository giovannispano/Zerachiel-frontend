import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-100">
      <Link href="/Login">Login Page</Link>
      <Link href="/Register">Register Page</Link>
    </div>
  );
}

