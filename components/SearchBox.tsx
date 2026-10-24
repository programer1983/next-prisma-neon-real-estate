import { Button } from "./ui/button";

export default function SearchBox() {
  return (
    <div
      className="mt-10 w-[60%]  rounded-[30px] border border-white/10 bg-white/10 
       p-4 shadow-2xl backdrop-blur-3xl "
    >
      <div className="flex flex-col items-center gap-4 lg:flex-row">
        <input
          type="text"
          placeholder="Search by city, neighborhood, or address"
          className="px-5 py-4 h-14 w-full flex-1 rounded-2xl bg-white/5 border border-white/5
           text-white placeholder:text-white/50 outline-none transition focus:border-[#4f46e5]/40"
        />
        <Button className="bg-[#4f46e5] h-13 px-5 rounded-2xl hover:bg-[#4f46e5]/50 transition duration-300">
          Search Properties
        </Button>
      </div>
    </div>
  );
}
