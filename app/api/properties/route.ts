import {
  CloudinaryUploadResult,
  uploadToCloudinary,
} from "./../../../services/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../../server-actions/getCurrentUser";
import { prisma } from "../../../database/db";

export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }
    const formData = await req.formData();
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
      !image
    ) {
      return NextResponse.json(
        {
          error: "All required fields must be provided",
        },
        {
          status: 400,
        },
      );
    }
    const imageData: CloudinaryUploadResult = await uploadToCloudinary(image);
    await prisma.property.create({
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
    return NextResponse.json({
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
