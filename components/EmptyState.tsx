"use client";
import { useRouter } from "next/navigation";
import { HiOutlineHomeModern } from "react-icons/hi2";

interface EmptyStateProps {
  title: string;
  subTitle?: string;
  filter?: boolean;
}

export default function EmptyState({
  title,
  subTitle,
  filter,
}: EmptyStateProps) {
  const router = useRouter();
  return (
    <div
      className="flex flex-col items-center justify-center 
      text-center py-20"
    >
      <div
        className="flex h-20 w-20 items-center justify-center
        rounded-full bg-gray-300/20"
      >
        <HiOutlineHomeModern size={40} className="text-[#4f46e5]" />
      </div>
      <h2 className="mt-6 text-3xl font-bold text-[#111827]">{title}</h2>
      {subTitle && (
        <p className="mt-3 max-w-md text-gray-500/70 leading-relaxed">
          {subTitle}
        </p>
      )}
      {filter && (
        <div className="mt-8">
          <button
            className="w-full bg-transparent flex items-center justify-center 
              gap-1.5 rounded-[10px] py-3 ring-1 ring-gray-500/30 hover:ring-gray-500/60 
              hover:ring-2 transition font-semibold duration-500 cursor-pointer disabled:opacity-50"
            onClick={() => router.replace("/")}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
