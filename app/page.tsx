import FrontendLayout from "../components/FrontendLayuot";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <FrontendLayout>
      <Navbar variant="solid" />
      <section
        className="relative flex min-h-screen items-center overflow-hidden bg-cover bg-center pt-32 lg:pt-36 py-2"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/80 via-slate-900/50 to-transparent" />
      </section>
    </FrontendLayout>
  );
}
