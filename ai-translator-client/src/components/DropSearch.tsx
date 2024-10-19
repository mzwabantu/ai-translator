import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, ComponentProps } from "react";

type DropSearchprops = ComponentProps<"div"> & {
  onClick: () => void;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
};

const DropSearch = ({ onClick, onSearch, children }: DropSearchprops) => {
  return (
    <div className="absolute -top-1 left-1/2 w-96 -translate-x-1/2 p-5 bg-white dark:bg-slate-950 border border-slate-400 dark:border-sky-800 rounded-lg z-20 shadow-2xl">
      <button
        onClick={onClick}
        className="p-1 rounded-full bg-slate-800 dark:bg-sky-700 text-white absolute -top-2 -right-2 flex justify-center items-center"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>

      <input
        type="search"
        className="px-3 py-2 border border-slate-400 dark:border-slate-800 rounded-full bg-slate-50 dark:bg-slate-900 w-full"
        onChange={onSearch}
        placeholder="Search for lang..."
      />
      {children}
    </div>
  );
};

export default DropSearch;
