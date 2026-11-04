import { Button } from "./ui/button";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import { useAuthModal } from "../store/useAuthModalStore";
import { useCreatePropertyModalStore } from "../store/useCreatePropertyModal";

interface NavLinkItem {
  name: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  isTransparent: boolean;
  navLinks: NavLinkItem[];
}
export default function MobileMenu({
  isOpen,
  isTransparent,
  navLinks,
}: MobileMenuProps) {
  const { openLogin } = useAuthModal();
  const { open: openCreateModal } = useCreatePropertyModalStore();

  return (
    <div>
      {isOpen && (
        <div
          className={`mt-4 rounded-3xl p-6 backdrop-blur-2xl lg:hidden 
          ${
            isTransparent
              ? "border border-white/10 bg-[#0f172a]/95"
              : "border border-black/5 bg-white"
          }`}
        >
          <div className="flex flex-col gap-5">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`hover:text-[#4f46e5] 
                  ${isTransparent ? "text-white/80" : "text-text/70"}`}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <Button
                className={`group bg-white text-black text-[12px] p-5 font-semibold 
                hover:bg-white duration-300 hover:scale-[1.05] will-change-transform
                 ${!isTransparent ? "border border-black/15 hover:border-black/30" : ""}`}
                onClick={openLogin}
              >
                <span className="group-hover:text-[#4f46e5] ">Login</span>
              </Button>
              <Button
                className={`group bg-white text-black text-[12px] p-5 font-semibold 
                hover:bg-white duration-300 hover:scale-[1.05] will-change-transform 
                ${!isTransparent ? "border border-black/15 hover:border-black/30" : ""}`}
                onClick={openCreateModal}
              >
                <span className="group-hover:text-[#4f46e5]">
                  <FaHome />
                </span>
                <span className="group-hover:text-[#4f46e5]">Add Property</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
