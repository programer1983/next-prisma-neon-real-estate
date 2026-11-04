"use client";

import { useState } from "react";
import { useCreatePropertyModalStore } from "../store/useCreatePropertyModal";
import Modal from "./Modal";
import { propertyTypes } from "../data/propertyTypes";
import PropertyTypeCard from "./PropertyTypeCard";
import { cn } from "cn";

const STEPS = {
  TYPE: 0,
  LOCATION: 1,
  DETAILS: 2,
  FEATURES: 3,
  IMAGE: 4,
  PRICING: 5,
};

export default function CreatePropertyModal() {
  const [step, setStep] = useState(STEPS.TYPE);
  const { isOpen, close } = useCreatePropertyModalStore();
  const [loading, setLoading] = useState(false);
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");

  const hasLocation = Boolean(location);
  const hasAddress = Boolean(address);

  const stepTitle = () => {
    switch (step) {
      case STEPS.TYPE:
        return "Select Property type";
      case STEPS.LOCATION:
        return "Where is the property located?";
      case STEPS.DETAILS:
        return "Share some basics about your place";
      case STEPS.FEATURES:
        return "Property description";
      case STEPS.IMAGE:
        return "Upload property image";
      case STEPS.PRICING:
        return "Set Property price";

      default:
        return "";
    }
  };

  const createListing = async () => {};

  return (
    <Modal title="Create a new listing" onClose={close} isOpen={isOpen}>
      <div
        className="mb-6 flex items-center justify-between 
       text-sm text-gray-500"
      >
        <span>Step {step + 1} of 6</span>
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
            <div className="relative">
              <input
                name="location"
                id="location"
                type="text"
                value={location}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLocation(e.target.value)
                }
                style={{
                  transition: "background-color 9999s ease-in-out 0s",
                }}
                className="peer px-3.5 pt-4.5 pb-1 h-12 w-full outline-none rounded-lg 
                    border-2 border-gray-500/30 bg-white transition-colors duration-200 
                    focus:border-[2.5px] focus:border-gray-500/60"
              />
              <label
                htmlFor="location"
                className={cn(
                  "absolute top-3.5 left-4 text-gray-500 text-sm transition-all duration-200 pointer-events-none origin-left",
                  hasLocation
                    ? "scale-75 -translate-y-2.5 text-gray-700"
                    : "peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-gray-700",
                )}
              >
                Location
              </label>
            </div>
            <div className="relative">
              <input
                name="address"
                id="address"
                type="text"
                value={address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAddress(e.target.value)
                }
                style={{
                  transition: "background-color 9999s ease-in-out 0s",
                }}
                className="peer px-3.5 pt-4.5 pb-1 h-12 w-full outline-none rounded-lg 
                    border-2 border-gray-500/30 bg-white transition-colors duration-200 
                    focus:border-[2.5px] focus:border-gray-500/60"
              />
              <label
                htmlFor="address"
                className={cn(
                  "absolute top-3.5 left-4 text-gray-500 text-sm transition-all duration-200 pointer-events-none origin-left",
                  hasAddress
                    ? "scale-75 -translate-y-2.5 text-gray-700"
                    : "peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-gray-700",
                )}
              >
                Address
              </label>
            </div>
          </div>
        )}
        {step === STEPS.DETAILS &&(
          <div className="space-y-4">

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
          className="py-2 w-full bg-blue-600 text-white rounded-lg
          transition duration-500 cursor-pointer disabled:opacity-50 hover:bg-blue-400"
          onClick={() =>
            step < STEPS.PRICING ? setStep((prev) => prev + 1) : createListing()
          }
          disabled={loading}
        >
          {step === STEPS.PRICING ? "Create listing" : "Next"}
        </button>
      </div>
    </Modal>
  );
}
