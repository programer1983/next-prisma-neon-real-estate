import { FaMapMarkerAlt, FaRulerCombined } from "react-icons/fa";
import FrontendLayout from "../../../components/FrontendLayuot";
import Navbar from "../../../components/Navbar";
import { LuBath, LuBedDouble } from "react-icons/lu";
import Image from "next/image";
import EmailForm from "../../../components/EmailForm";
import { Suspense } from "react";
import { getProperty } from "../../../server-actions/getProperty";
import PropertyPageSkeleton from "../../../components/sceletons/PropertyPageSceleton";

export function formatPrice(price: number | string) {
  return Number(price).toLocaleString();
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ propertyId: string }>;
}) {
  const propertyId = (await params).propertyId;
  return (
    <FrontendLayout>
      <Navbar variant="solid" />
      <Suspense fallback={<PropertyPageSkeleton />}>
        <PropertyContent propertyId={propertyId} />
      </Suspense>
    </FrontendLayout>
  );
}

async function PropertyContent({ propertyId }: { propertyId: string }) {
  const property = await getProperty(propertyId);
  return (
    <section className="py-15">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col gap-8 min-[1100px]:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25rem] text-[#4f46e5]">
              {property?.listingType === "sale" ? "FOR SALE" : "FOR RENT"}
            </p>
            <h2 className="mt-3 text-4xl font-bold text-[#111827] md:text-5xl">
              {property?.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600 my-6">
              <div
                className="flex items-center gap-2 rounded-full px-3 py-1.5 border 
                border-neutral-200"
              >
                <FaMapMarkerAlt size={16} className="text-neutral-400" />
                <span className="font-medium text-neutral-800">
                  {property?.location}
                </span>
              </div>
              <div
                className="flex items-center gap-2 rounded-full px-3 py-1.5 border 
                border-neutral-200"
              >
                <FaRulerCombined size={16} className="text-neutral-400" />
                <span className="font-medium text-neutral-800">
                  {property?.area} sqft
                </span>
              </div>
              <div
                className="flex items-center gap-2 rounded-full px-3 py-1.5 border 
                border-neutral-200"
              >
                <LuBedDouble size={16} className="text-neutral-400" />
                <span className="font-medium text-neutral-800">
                  {property?.bedrooms} rooms
                </span>
              </div>
              <div
                className="flex items-center gap-2 rounded-full px-3 py-1.5 border 
                border-neutral-200"
              >
                <LuBath size={16} className="text-neutral-400" />
                <span className="font-medium text-neutral-800">
                  {property?.bethrooms} baths
                </span>
              </div>
            </div>
          </div>
          <div className="rounded-[28px] border border-black/5 bg-[#ffffff] p-6 shadow-sm">
            <p className="text-sm text-[#111827]/60">Property Price</p>
            <h2 className="mt-2 text-4xl font-bold text-[#4f46e5]">
              ${formatPrice(property?.price || "")}
            </h2>
          </div>
        </div>
        <div className="w-full h-60 md:h-100 lg:h-120 relative my-6">
          <Image
            src={property?.image || ""}
            alt="property"
            className="object-cover rounded-2xl"
            fill
          />
        </div>
        <div className="mt-16  gap-10 lg:grid  lg:grid-cols-3">
          <div className="col-span-2">
            <div className="rounded-4xl border border-black/5 bg-[#ffffff] p-8 shadow-sm">
              <h2 className="text-[25px] md:text-3xl text-[#111827] font-bold">
                About This Property
              </h2>
              <p className="mt-6 leading-relaxed text-[#111827]/70">
                {property?.description}
              </p>
            </div>
          </div>
          {property?.owner && (
            <EmailForm
              propertyPrice={property.price}
              propertyTitle={property.title}
              email={property.owner.email}
              name={property.owner.name}
              image={property.owner.image || "/iages/avatar.png"}
            />
          )}
        </div>
      </div>
    </section>
  );
}
