export interface Property {
  id: string;
  title: string;
  description: string;
  propertyType: string;
  listingType: string;
  price: number;
  bedrooms: number;
  bethrooms: number;
  parkingSpaces: number;
  area: number | null;
  location: string;
  address: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
}
