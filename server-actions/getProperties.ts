"use server";

import { prisma } from "../database/db";
import { getCurrentUser } from "./getCurrentUser";

export interface GetPropertiesParams {
  search?: string;
  propertyType?: string;
  location?: string;
  address?: string;
  minPrice?: string | number;
  maxPrice?: string | number;
  onlyCurrentUser?: boolean;
}

export async function getProperties(params: GetPropertiesParams = {}) {
  try {
    const {
      search,
      propertyType,
      location,
      minPrice,
      maxPrice,
      address,
      onlyCurrentUser,
    } = params;

    let ownerFilter = {};

    if (onlyCurrentUser) {
      const currentUser = await getCurrentUser();
      if (!currentUser?.id) {
        return [];
      }
      ownerFilter = { ownerId: currentUser.id };
    }

    const parsedMinPrice =
      minPrice !== undefined && minPrice !== "" ? Number(minPrice) : undefined;
    const parsedMaxPrice =
      maxPrice !== undefined && maxPrice !== "" ? Number(maxPrice) : undefined;

    const whereClause = {
      ...ownerFilter,
      ...(propertyType && propertyType.trim() !== "" && { propertyType }),
      ...(location &&
        location.trim() !== "" && {
          location: { contains: location.trim(), mode: "insensitive" as const },
        }),
      ...(address &&
        address.trim() !== "" && {
          address: { contains: address.trim(), mode: "insensitive" as const },
        }),
      ...(search &&
        search.trim() !== "" && {
          OR: [
            {
              title: { contains: search.trim(), mode: "insensitive" as const },
            },
            {
              description: {
                contains: search.trim(),
                mode: "insensitive" as const,
              },
            },
            {
              address: {
                contains: search.trim(),
                mode: "insensitive" as const,
              },
            },
            {
              location: {
                contains: search.trim(),
                mode: "insensitive" as const,
              },
            },
          ],
        }),
      ...(parsedMinPrice !== undefined || parsedMaxPrice !== undefined
        ? {
            price: {
              ...(parsedMinPrice !== undefined &&
                !isNaN(parsedMinPrice) && { gte: parsedMinPrice }),
              ...(parsedMaxPrice !== undefined &&
                !isNaN(parsedMaxPrice) && { lte: parsedMaxPrice }),
            },
          }
        : {}),
    };

    const properties = await prisma.property.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });

    return properties;
  } catch (error) {
    console.error("Get properties error:", error);
    return [];
  }
}
