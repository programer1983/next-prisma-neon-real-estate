import FrontendLayout from "../components/FrontendLayuot";
import Hero from "../components/HeroSection";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <FrontendLayout>
      <Navbar />
      <Hero />
    </FrontendLayout>
  );
}
