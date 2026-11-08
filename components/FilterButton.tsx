"use client";

import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { Button } from "./ui/button";
import { useFilterModalStore } from "../store/useFilterModalStore";

export default function FilterButton() {
  const { open } = useFilterModalStore();
  return (
    <Button
      variant={"outline"}
      className="font-semibol text-base p-5 rounded-[12px] 
      hover:bg-transparent cursor-pointer  hover:border-black/30"
      onClick={open}
    >
      <HiOutlineAdjustmentsHorizontal className="size-4" />
      Filter
    </Button>
  );
}
