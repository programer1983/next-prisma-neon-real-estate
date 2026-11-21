"use client";

import { useState } from "react";
import { useCreatePropertyModalStore } from "../store/useCreatePropertyModal";
import Modal from "./Modal";
import { propertyTypes } from "../data/propertyTypes";
import PropertyTypeCard from "./PropertyTypeCard";
import Counter from "./Counter";
import { Input } from "./InputLayout";
import ImageUpload from "./ImageUpload";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Textarea } from "./TextariaLaout";
import { TbLoader2 } from "react-icons/tb";
import { createProperty } from "../server-actions/createProperty";

const STEPS = {
  TYPE: 0,
  LOCATION: 1,
  DETAILS: 2,
  FEATURES: 3,
  IMAGE: 4,
  PRICING: 5,
};

export default function CreatePropertyModal() {
  const router = useRouter();
  const [step, setStep] = useState(STEPS.TYPE);
  const { isOpen, close } = useCreatePropertyModalStore();
  const [loading, setLoading] = useState(false);
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [bedrooms, setBedrooms] = useState(1);
  const [bethrooms, setBethrooms] = useState(1);
  const [parkingSpaces, setParkingSpaces] = useState(0);
  const [area, setArea] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<null | File>(null);
  const [preview, setPreview] = useState<null | string>(null);
  const [listingType, setListingType] = useState<"rent" | "sale">("sale");
  const [price, setPrice] = useState("");

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

  const handleImageChange = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const createListing = async () => {
    console.log("1. Нажата кнопка Create!", {
      title,
      propertyType,
      image,
      price,
    });
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("location", location);
      formData.append("address", address);
      formData.append("area", area);
      formData.append("propertyType", propertyType);
      formData.append("listingType", listingType);
      formData.append("bedrooms", bedrooms.toString());
      formData.append("bethrooms", bethrooms.toString());
      formData.append("parkingSpaces", parkingSpaces.toString());
      formData.append("price", price.toString());
      if (image) {
        formData.append("image", image);
      }

      console.log("2. Отправляем в Server Action...");
      const result = await createProperty(formData);
      console.log("3. Ответ от сервера:", result);

      if (!result) {
        toast.error(
          "Server returned empty response (check file size limit in next.config)",
        );
        return;
      }

      if (result?.error) {
        toast.error(result.error);
        setLoading(false);
        return;
      }

      toast.success("Property created successfully");
      handleClose();
      router.push("/properties");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPrice("");
    setBedrooms(1);
    setBethrooms(1);
    setParkingSpaces(0);
    setPropertyType("");
    setLocation("");
    setTitle("");
    setDescription("");
    setImage(null);
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setStep(STEPS.TYPE);
    setAddress("");
    setArea("");
    close();
  };

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
        {step === STEPS.DETAILS && (
          <div className="space-y-4">
            <Counter
              title="Bedrooms"
              subTitle="How many bedrooms"
              value={bedrooms}
              onChange={setBedrooms}
            />
            <Counter
              title="Bethrooms"
              subTitle="How many bethrooms"
              value={bethrooms}
              onChange={setBethrooms}
            />
            <Counter
              title="Parking Spaces"
              subTitle="How many parking spaces"
              value={parkingSpaces}
              onChange={setParkingSpaces}
            />
            <div className="relative">
              <input
                name="area"
                type="number"
                placeholder="Property area (sqft)"
                value={area}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setArea(e.target.value)
                }
                style={{
                  transition: "background-color 9999s ease-in-out 0s",
                }}
                className="w-full h-12.5 outline-none rounded-lg py-3.75 px-2.5 
                border-2 border-gray-500/30 bg-white transition-colors 
                duration-200 hover:border-gray-500/60 hover:border-[2.5px] 
                focus:border-[2.5px] focus:border-gray-500/60"
              />
            </div>
          </div>
        )}
        {step === STEPS.FEATURES && (
          <div className="space-y-6">
            <Input
              name="title"
              id="title"
              label="Title"
              type="text"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
            <Textarea
              name="description"
              id="description"
              label="Description"
              type="text"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
            />
          </div>
        )}
        {step === STEPS.IMAGE && (
          <ImageUpload preview={preview} onChange={handleImageChange} />
        )}
        {step === STEPS.PRICING && (
          <div className="space-y-6">
            <select
              value={listingType}
              onChange={(e) =>
                setListingType(e.target.value as "sale" | "rent")
              }
              className="w-full h-12.5 outline-none rounded-2xl  px-2.5 
                border-2 border-gray-500/30 bg-white transition-colors 
                duration-200 hover:border-gray-500/60 hover:border-[2.5px] 
                focus:border-[2.5px] focus:border-gray-500/60"
            >
              <option value="rent">For Rent</option>
              <option value="sale">For Sale</option>
            </select>
            <input
              name="price"
              type="number"
              placeholder={
                listingType === "sale" ? "Sale Price" : "Monthly Rent"
              }
              value={price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPrice(e.target.value)
              }
              style={{
                transition: "background-color 9999s ease-in-out 0s",
              }}
              className="w-full h-12.5 outline-none rounded-2xl py-3.75 px-2.5 
                border-2 border-gray-500/30 bg-white transition-colors 
                duration-200 hover:border-gray-500/60 hover:border-[2.5px] 
                focus:border-[2.5px] focus:border-gray-500/60 placeholder:text-gray-500/70"
            />
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
            step < STEPS.PRICING ? setStep((prev) => prev + 1) : createListing()
          }
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-1.5">
              <TbLoader2 className="w-5 h-5 animate-spin" />
              <span>Creating...</span>
            </div>
          ) : step === STEPS.PRICING ? (
            "Create listing"
          ) : (
            "Next"
          )}
        </button>
      </div>
    </Modal>
  );
}
