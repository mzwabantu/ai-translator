import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import langs from "../languages/languages.json";
import DropSearch from "./DropSearch";

interface DropdownProps {
  setLang: (lang: Language, dir: Direction) => void;
}

const Dropdown = ({ setLang }: DropdownProps) => {
  const [from, setFrom] = useState<Language>(langs[0]);
  const [to, setTo] = useState<Language>(langs[1]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredLangs, setFilteredLangs] = useState<Language[]>(langs);
  const [direction, setDirection] = useState<Direction>(null);

  const handleSelect = (lang: Language) => {
    if (direction === "from") setFrom(lang);
    if (direction === "to") setTo(lang);
    setShowDropdown(!showDropdown);
    setLang(lang, direction);
  };

  const searchLang = (e: string) => {
    if (!e) {
      setFilteredLangs(langs);
      return;
    }

    const searchedLang: Language[] = langs.filter((lang) =>
      lang.label.toLowerCase().includes(e.toLowerCase())
    );
    setFilteredLangs(searchedLang);
  };

  const onButtonClick = (direction: Direction) => {
    setDirection(direction);
    setFilteredLangs(langs);
    setShowDropdown(!showDropdown);
  };

  const buttons: LanguageButton[] = [
    { direction: "from", lang: from },
    { direction: "to", lang: to },
  ];

  const isActiveLang = (lang: Language): boolean => {
    return (
      (lang.code === from.code && direction === "from") ||
      (lang.code === to.code && direction === "to")
    );
  };

  const renderLanguages = () => {
    return (
      <div className="grid grid-cols-3 gap-4 pt-5 text-left">
        {filteredLangs.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleSelect(lang)}
            className={twMerge(
              isActiveLang(lang)
                ? "text-sky-600 font-medium"
                : "text-slate-600 dark:text-slate-100",
              "text-sm text-left relative pl-4"
            )}
          >
            {isActiveLang(lang) && (
              <CheckIcon className="h-3 w-3 absolute top-1 left-0" />
            )}
            {lang.label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="relative grid grid-cols-2 rounded-lg border border-slate-300 dark:border-sky-700 bg-white dark:bg-transparent shadow-md dark:shadow-none">
      <span className="absolute w-[2px] h-full left-1/2 top-1/2 bg-slate-300 dark:bg-sky-700 -translate-x-1/2 -translate-y-1/2"></span>
      {buttons.map((btn) => (
        <button
          key={btn.lang.code}
          onClick={() => onButtonClick(btn.direction)}
          className="w-36 py-2 px-4 flex items-center justify-center gap-5"
        >
          {btn.lang.label} <ChevronDownIcon className="w-4 h-4" />
        </button>
      ))}

      {showDropdown && (
        <DropSearch
          onClick={() => setShowDropdown(!showDropdown)}
          onSearch={(e) => searchLang(e.target.value)}
        >
          {filteredLangs.length > 0 ? (
            renderLanguages()
          ) : (
            <p className="py-5 text-sm text-slate-600 dark:text-slate-200">
              No language was found, it's either unsupported or does not exist.
            </p>
          )}
        </DropSearch>
      )}
    </div>
  );
};

export default Dropdown;
