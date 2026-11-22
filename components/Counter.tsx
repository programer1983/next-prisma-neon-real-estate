import { LuMinus, LuPlus } from "react-icons/lu";

interface CounterProps {
  title: string;
  subTitle?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function Counter({
  title,
  subTitle,
  value,
  onChange,
  min = 1,
  max = 20,
}: CounterProps) {
  const increase = () => {
    if (value < max) onChange(value + 1);
  };

  const decrease = () => {
    if (value > min) onChange(value - 1);
  };

  return (
    <div
      className="flex flex-col gap-4 md:flex-row items-center 
      justify-between py-6 border-b last:border-b-0 md:gap-8"
    >
      <div className="flex flex-col items-center md:items-start">
        <p className="font-medium text-gray-900">{title}</p>
        {subTitle && <p className="text-sm text-gray-500">{subTitle}</p>}
      </div>
      <div className="flex text-left items-center gap-4">
        <button
          onClick={decrease}
          disabled={min === value}
          className="w-8 h-8 rounded-full border border-gray-300 flex 
          items-center justify-center disabled:opacity-30 transition
          disabled:cursor-not-allowed hover:border-black"
        >
          <LuMinus size={16} />
        </button>
        <span className="w-6 text-center font-medium text-gray-600">
          {value}
        </span>
        <button
          onClick={increase}
          disabled={max === value}
          className="w-8 h-8 rounded-full border border-gray-300 flex 
         items-center justify-center disabled:opacity-30 transition
         disabled:cursor-not-allowed hover:border-black"
        >
          <LuPlus size={16} />
        </button>
      </div>
    </div>
  );
}
