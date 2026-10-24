import { Badge } from "../components/ui/badge";
import SearchBox from "./SearchBox";

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden bg-cover bg-center pt-32 lg:pt-36 py-2"
      style={{ backgroundImage: "url('/images/hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-linear-to-r from-slate-950/80 via-slate-900/50 to-transparent" />
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 
             bg-white/5 px-5 py-2 backdrop-blur-xl"
          >
            <Badge className="w-2 h-2 px-0 rounded-full bg-[#4f46e5]"></Badge>
            <span className="text-sm font-medium tracking-wide text-white">
              Premium Real Estate Marketplace
            </span>
          </div>
          <h2 className="text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            Find The Perfect Place To Call Home
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            Discover luxury apartaments, modern homes, and premium properties in
            the best location around the world.
          </p>
          <SearchBox />
        
        </div>
      </div>
    </section>
  );
}
