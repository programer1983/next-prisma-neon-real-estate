import { FaBuilding, FaHome, FaWarehouse } from "react-icons/fa";
import {
  LuBuilding2,
  LuHotel,
  LuHousePlug,
  LuLandPlot,
  LuTrees,
} from "react-icons/lu";

export const propertyTypes = [
  { label: "House", icon: FaHome, slug: "house" },
  { label: "Apartament", icon: FaBuilding, slug: "apartament" },
  { label: "Villa", icon: LuHousePlug, slug: "villa" },
  { label: "Penthouse", icon: LuBuilding2, slug: "penthouse" },
  { label: "Warehouse", icon: FaWarehouse, slug: "warehouse" },
  { label: "Hotel", icon: LuHotel, slug: "hotel" },
  { label: "Land", icon: LuLandPlot, slug: "land" },
  { label: "Office", icon: LuBuilding2, slug: "office" },
  { label: "Townhouse", icon: LuTrees, slug: "townhouse" },
  { label: "Commercial", icon: LuTrees, slug: "commercial" },
];
