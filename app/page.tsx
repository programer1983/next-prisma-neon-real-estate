import FrontendLayout from "../components/FrontendLayuot";
import Hero from "../components/HeroSection";
import Navbar from "../components/Navbar";
import RecentProperties from "../components/RecentProperties";

export default function Home() {
  return (
    <FrontendLayout>
      <Navbar />
      <Hero />
      <RecentProperties />
    </FrontendLayout>
  );
}
