import Link from "next/link";

interface NavbarProps {
  variant?: "transparent" | "solid";
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "/properties" },
  { name: "Marketplace", href: "/marketplace" },
];

export default function Navbar({ variant = "transparent" }: NavbarProps) {
  const isTransparent = variant === "transparent";
  return (
    <section
      className={`top-0 left-0 z-50 w-full
      ${isTransparent ? "absolute" : "sticky border-b border-black/5 bg-card"}
  `}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <nav
          className={`flex items-center justify-between h-20 ${isTransparent ? "mt-6 rounded-3xl border border-white/10 bg-white/5 px-6 backdrop-blur-2xl" : "px-0"}`}
        >
          <Link href="/" className="flex items-center font-semibold text-2xl">
            <span className={isTransparent ? "text-gray-300 " : "text-text"}>
              Next
            </span>
            <span className="bg-primary text-white px-2 py-1 rounded-tr-2xl rounded-bl-2xl">
              Estate
            </span>
          </Link>
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition hover:text-primary ${isTransparent ? "text-white/80" : "text-text/70"}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-4"></div>
        </nav>
      </div>
    </section>
  );
}
