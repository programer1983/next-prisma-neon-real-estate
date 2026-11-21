import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import Navbar from "../../../components/Navbar";
import PropertyCard from "../../../components/PropertyCard";
import FrontendLayout from "./../../../components/FrontendLayuot";
import { Button } from "../../../components/ui/button";
import { getUserProperties } from "../../../server-actions/getUserProperties";
import { Suspense } from "react";
import CardSceleton from "../../../components/sceletons/CardSceleton";
import EmptyState from "../../../components/EmptyState";
import FilterButton from "../../../components/FilterButton";
import {
  getProperties,
  GetPropertiesParams,
} from "../../../server-actions/getProperties";

interface PageProps {
  searchParams: Promise<GetPropertiesParams>;
}
export default async function PropertiesPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  return (
    <FrontendLayout>
      <Navbar variant="solid" />
      <div className="mx-auto max-w-7xl p-6 lg:p-12 w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-[#111827] md:text-3xl">
            Properties
          </h2>
          <FilterButton />
        </div>
        <Suspense
          key={JSON.stringify(resolvedParams)}
          fallback={<CardSceleton />}
        >
          <PropertiesContent params={resolvedParams} />
        </Suspense>
      </div>
    </FrontendLayout>
  );
}

async function PropertiesContent({ params }: { params: GetPropertiesParams }) {
  const properties = await getProperties({
    ...params,
    onlyCurrentUser: true,
  });
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
