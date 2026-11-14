import { Property } from "../types/property";
import Link from "next/link";
import Image from "next/image";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link
      href={`/property/${property.id}`}
      className="group relative block rounded-4xl h-125 overflow-hidden"
    >
      <Image
        src={property.image}
        alt={property.title}
        fill
        className="object-cover transition duration-700 group-hover:scale-110"
      />

      <div
        className="absolute inset-0 bg-linear-to-t from-black/90 
       via-black/20 to-transparent"
      />
      <div
        className="absolute left-5 top-5 z-20 rounded-full 
        bg-white/80 px-4 py-2 text-sm font-semibold text-[#4f46e5]"
      >
        {property.listingType === "rent" ? "For Rent" : "For Sale"}
      </div>
      <div
        className="absolute bottom-5 left-5 right-5 z-20 rounded-[28px] 
        border border-white/10 bg-white/10 p-5 backdrop-blur-2xl"
      >
        <div
          className="w-full flex flex-col-reverse min-[800px]:flex-row 
        items-start justify-between"
        >
          <div>
            {property.listingType === "rent" ? (
              <h3 className="text-3xl font-bold text-white flex items-center">
                ${property.price.toLocaleString()}
                <span className="text-sm text-white/60">/Month</span>
              </h3>
            ) : (
              <h3 className="text-3xl font-bold text-white">
                ${property.price.toLocaleString()}
              </h3>
            )}
            <p className="mt-1 text-sm text-white/60">{property.location}</p>
          </div>
          <div
            className="rounded-full bg-white/10 px-4 py-2 text-sm 
            font-medium text-white mb-5 min-[800px]:mb-0"
          >
            {property.propertyType}
          </div>
        </div>

        <h2 className="mt-5 text-2xl font-bold text-white">{property.title}</h2>

        <div className="mt-5 flex flex-wrap gap-3 border-t border-white/10 pt-5">
          <div className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
            {property.bedrooms} Beds
          </div>
          <div className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
            {property.bethrooms} Bathrooms
          </div>
          <div className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
            {property.area} sqft
          </div>
        </div>
      </div>
    </Link>
  );
}
