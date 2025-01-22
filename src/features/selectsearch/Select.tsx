import { useState } from "react";
import { Search, X } from "lucide-react";

export const Select = <T extends { [key in K]: string }, K extends keyof T>({
  labelKey,
  options,
  valueChange,
}: {
  valueChange: (newValue: T) => void;
  options: T[];
  labelKey: K;
}) => {
  const [selected, setSelected] = useState<T | null>(null);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const highlightMatch = (text: string) => {
    if (!search) return text;

    const regex = new RegExp(`(${search})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? <b key={index}>{part}</b> : part,
    );
  };

  return (
    <div>
      <div
        className="flex h-12 w-fit min-w-80 cursor-pointer items-center justify-between rounded-md border border-green-400 p-2 text-lg"
        onClick={() => setIsOpen((e) => !e)}
      >
        <span>{selected?.[labelKey]}</span>
        <X
          onClick={(e) => {
            setSelected(null);
            e.stopPropagation();
          }}
        />
      </div>
      {isOpen && (
        <div className="absolute mt-1 w-fit rounded-md border border-gray-300 bg-gray-50 p-2 z-20">
          <div className="mb-2 flex items-center gap-2">
            <Search />
            <input
              value={search}
              className="rounded-md border border-gray-300 p-1 px-2"
              type="text"
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
          </div>
          <ul>
            {options
              .filter((option) =>
                option[labelKey].toLowerCase().includes(search),
              )
              .map((option) => (
                <li
                  className="cursor-pointer text-left"
                  key={option[labelKey]}
                  onClick={() => {
                    setSelected(option);
                    valueChange(option);
                    setIsOpen(false);
                  }}
                >
                  {highlightMatch(option[labelKey])}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};
