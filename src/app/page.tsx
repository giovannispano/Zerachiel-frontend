import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Footer />
    </>
    // <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-100">
    //   <LoginPage />
    // </div>
  );
}
