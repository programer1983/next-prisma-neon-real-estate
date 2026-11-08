"use client";

import { useState } from "react";
import { useFilterModalStore } from "../store/useFilterModalStore";
import Modal from "./Modal";
import { propertyTypes } from "../data/propertyTypes";
import PropertyTypeCard from "./PropertyTypeCard";
import { Input } from "./InputLayout";

const STEPS = {
  TYPE: 0,
  LOCATION: 1,
  PRICE: 2,
};

export default function FilterModal() {
  const { isOpen, close } = useFilterModalStore();
  const [step, setStep] = useState(STEPS.TYPE);
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [minprice, setMinPrice] = useState("");
  const [maxprice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const stepTitle = () => {
    switch (step) {
      case STEPS.TYPE:
        return "Select Property type";
      case STEPS.LOCATION:
        return "Select a location";
      case STEPS.PRICE:
        return "Select a price range";
      default:
        return "";
    }
  };

  const applyFilter = async () => {};
  return (
    <Modal title="Filter Properties" onClose={close} isOpen={isOpen}>
      <div
        className="mb-6 flex items-center justify-between 
        text-sm text-gray-500"
      >
        <span>Step {step + 1} of 3</span>
        <span className="font-medium text-gray-700">{stepTitle()}</span>
      </div>
      <div
        className="min-h-55 rounded-xl text-gray-400 p-6 border
        border-dashed border-gray-300"
      >
        {step === STEPS.TYPE && (
          <div
            className="grid grid-cols-2 gap-4 w-full max-h-[50vh] 
                    overflow-y-scroll no-scrollbar"
          >
            {propertyTypes.map((item) => (
              <PropertyTypeCard
                label={item.label}
                icon={item.icon}
                selected={propertyType === item.slug}
                onClick={() => setPropertyType(item.slug)}
                key={item.slug}
              />
            ))}
          </div>
        )}
        {step === STEPS.LOCATION && (
          <div className="space-y-6 w-full">
            <Input
              name="location"
              id="location"
              label="Location"
              type="text"
              value={location}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLocation(e.target.value)
              }
            />
            <Input
              name="address"
              id="address"
              label="Address"
              type="text"
              value={address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddress(e.target.value)
              }
            />
          </div>
        )}
        {step === STEPS.PRICE && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                name="min-price"
                type="number"
                placeholder="Min Price"
                value={minprice}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMinPrice(e.target.value)
                }
                style={{
                  transition: "background-color 9999s ease-in-out 0s",
                }}
                className="w-full h-12.5 outline-none rounded-lg py-3.75 px-2.5 
                border-2 border-gray-500/30 bg-white transition-colors 
                duration-200 hover:border-gray-500/60 hover:border-[2.5px] 
                focus:border-[2.5px] focus:border-gray-500/60 placeholder:text-gray-500/70"
              />
            </div>
            <div>
              <input
                name="max-price"
                type="number"
                placeholder="Max Price"
                value={maxprice}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMaxPrice(e.target.value)
                }
                style={{
                  transition: "background-color 9999s ease-in-out 0s",
                }}
                className="w-full h-12.5 outline-none rounded-lg py-3.75 px-2.5 
                border-2 border-gray-500/30 bg-white transition-colors 
                duration-200 hover:border-gray-500/60 hover:border-[2.5px] 
                focus:border-[2.5px] focus:border-gray-500/60 placeholder:text-gray-500/70"
              />
            </div>
          </div>
        )}
      </div>
      <div className="mt-3 flex gap-3">
        {step > STEPS.TYPE && (
          <button
            className="w-full bg-transparent flex items-center justify-center 
            gap-1.5 rounded-[10px] py-3 ring-1 ring-gray-500/30 hover:ring-gray-500/60 
            hover:ring-2 transition font-semibold duration-500 cursor-pointer disabled:opacity-50"
            onClick={() => setStep((prev) => prev - 1)}
          >
            Back
          </button>
        )}
        <button
          className="py-2 w-full bg-[#4f46e5] text-white rounded-lg
          transition duration-500 cursor-pointer disabled:opacity-50 hover:bg-[#4f46e5]/80"
          onClick={() =>
            step < STEPS.PRICE ? setStep((prev) => prev + 1) : applyFilter()
          }
          disabled={loading}
        >
          {step === STEPS.PRICE ? "Apply Filter" : "Next"}
        </button>
      </div>
    </Modal>
  );
}
