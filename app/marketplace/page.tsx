import FrontendLayout from "../../components/FrontendLayuot";
import Navbar from "../../components/Navbar";
import { dummyProperties } from "../../data/dummyProperties";
import PropertyCard from "../../components/PropertyCard";
import FilterButton from "../../components/FilterButton";

export default function MarketPlace() {
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
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 my-4">
          {dummyProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
      s
    </FrontendLayout>
  );
}
