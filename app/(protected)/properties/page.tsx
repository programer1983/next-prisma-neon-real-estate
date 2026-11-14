import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import Navbar from "../../../components/Navbar";
import PropertyCard from "../../../components/PropertyCard";
import FrontendLayout from "./../../../components/FrontendLayuot";
import { Button } from "../../../components/ui/button";
import { getUserProperties } from "../../../server-actions/getUserProperties";
import { Suspense } from "react";
import CardSceleton from "../../../components/sceletons/CardSceleton";
import EmptyState from "../../../components/EmptyState";

export default function PropertiesPage() {
  return (
    <FrontendLayout>
      <Navbar variant="solid" />
      <div className="mx-auto max-w-7xl p-6 lg:p-12 w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-[#111827] md:text-3xl">
            Properties
          </h2>
          <Button
            variant={"outline"}
            className="font-semibol text-base p-5 rounded-[12px] hover:bg-transparent
            cursor-pointer  hover:border-black/30"
          >
            <HiOutlineAdjustmentsHorizontal className="size-4" />
            Filter
          </Button>
        </div>
        <Suspense fallback={<CardSceleton />}>
          <PropertiesContent />
        </Suspense>
      </div>
    </FrontendLayout>
  );
}

async function PropertiesContent() {
  const properties = await getUserProperties();
  if (properties.length === 0) {
    return (
      <EmptyState
        title="No Properties Found"
        subTitle="You currently have no properties available.
        Check back later after creating new listing"
      />
    );
  }
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 my-4">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
