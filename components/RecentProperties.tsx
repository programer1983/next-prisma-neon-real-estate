import { dummyProperties } from "../data/dummyProperties";
import PropertyCard from "./PropertyCard";

export default function RecentProperties() {
  return (
    <section className="p-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracing-[0.25em] text-[#4f46e5]">
            New Listing
          </p>
          <h2 className="text-3xl font-bold text-[#111827] md:text-4xl">
            Discover Recently Added Properties
          </h2>
          <p className="mt-5 text-md leading-relaxed text-[#111827]/60">
            Browse the latest homes, apartaments, villas, and opportunites added
            to our marketplace by trusted own and agents.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 my-6">
          {dummyProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
