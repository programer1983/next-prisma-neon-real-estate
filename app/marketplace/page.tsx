import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import FrontendLayout from "../../components/FrontendLayuot";
import Navbar from "../../components/Navbar";
import { Button } from "../../components/ui/button";
import { dummyProperties } from "../../data/dummyProperties";
import PropertyCard from "../../components/PropertyCard";

export default function MarketPlace() {
  return (
    <FrontendLayout>
      <Navbar variant="solid" />
      <div className="mx-auto max-w-7xl p-6 lg:p-12 w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-[#111827] md:text-3xl">
            Explore
          </h2>
          <Button
            variant={"outline"}
            className=" font-semibol text-base p-5 rounded-[12px] hover:bg-transparent
            cursor-pointer  hover:border-black/30"
          >
            <HiOutlineAdjustmentsHorizontal className="size-4" />
            Filter
          </Button>
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
