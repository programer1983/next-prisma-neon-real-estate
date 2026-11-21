"use server";

import { revalidatePath } from "next/cache";
import {
  CloudinaryUploadResult,
  uploadToCloudinary,
} from "../services/cloudinary";
import { getCurrentUser } from "./getCurrentUser";
import { prisma } from "../database/db";

export async function createProperty(formData: FormData) {
  console.log(
    "=== FORM DATA ON SERVER ===",
    Object.fromEntries(formData.entries()),
  );
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return { error: "Unauthorized" };
    }

    const title = formData.get("title") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;
    const propertyType = formData.get("propertyType") as string;
    const listingType = formData.get("listingType") as string;
    const bedrooms = formData.get("bedrooms") as string;
    const bethrooms = formData.get("bethrooms") as string;
    const parkingSpaces = formData.get("parkingSpaces") as string;
    const location = formData.get("location") as string;
    const address = formData.get("address") as string;
    const area = formData.get("area") as string;
    const image = formData.get("image") as File;

    if (
      !title ||
      !price ||
      !description ||
      !propertyType ||
      !listingType ||
      !bedrooms ||
      !bethrooms ||
      !parkingSpaces ||
      !location ||
      !address ||
      !image ||
      image.size === 0
    ) {
      return { error: "All required fields must be provided" };
    }

    const imageData: CloudinaryUploadResult = await uploadToCloudinary(image);

    const newProperty = await prisma.property.create({
      data: {
        title,
        price: Number(price),
        description,
        propertyType,
        listingType,
        bedrooms: Number(bedrooms),
        bethrooms: Number(bethrooms),
        parkingSpaces: Number(parkingSpaces),
        location,
        address,
        area: area ? Number(area) : null,
        image: imageData.secure_url,
        ownerId: currentUser.id,
      },
    });

    // Сбрасываем кэш обеих страниц, чтобы новое объявление сразу появилось везде
    revalidatePath("/properties");
    revalidatePath("/marketplace");

    return { success: true, data: newProperty };
  } catch (error) {
    console.error("Create property error:", error);
    return { error: "Something went wrong" };
  }
}
