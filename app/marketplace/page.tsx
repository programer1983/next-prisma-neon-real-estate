import FrontendLayout from "../../components/FrontendLayuot";
import Navbar from "../../components/Navbar";
import FilterButton from "../../components/FilterButton";
import MarketPlace from "../../components/MarketPlace";
import { Suspense } from "react";
import CardSceleton from "../../components/sceletons/CardSceleton";

type MarketPageProps = {
  searchParams: Promise<{
    search?: string;
    propertyType?: string;
    location?: string;
    address?: string;
    minPrice?: number;
    maxPrice?: number;
  }>;
};

export default async function MarketPage({ searchParams }: MarketPageProps) {
  const params = await searchParams;
  return (
    <FrontendLayout>
      <Navbar variant="solid" />
      <div className="mx-auto max-w-7xl p-6 lg:p-12 w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-[#111827] md:text-3xl">
            Explore
          </h2>
          <FilterButton />
        </div>
        <Suspense fallback={<CardSceleton />}>
          <MarketPlace searchParams={params} />
        </Suspense>
      </div>
    </FrontendLayout>
  );
}
