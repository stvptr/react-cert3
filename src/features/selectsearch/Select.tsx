import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";

export const Select = <T extends { [key in K]: string }, K extends keyof T>({
  labelKey,
  options,
  valueChange,
}: {
  valueChange: (newValue: T | undefined) => void;
  options: T[];
  labelKey: K;
}) => {
  const [selected, setSelected] = useState<T | undefined>(undefined);
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

  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target instanceof Element &&
        !ref.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, []);

  const lowerCaseSearch = search.toLowerCase();

  return (
    <div ref={ref}>
      <div
        className="flex h-12 w-fit min-w-80 cursor-pointer items-center justify-between rounded-md border border-green-400 p-2 text-lg"
        onClick={() => setIsOpen((e) => !e)}
      >
        <span>{selected?.[labelKey]}</span>
        <X
          onClick={(e) => {
            setSelected(undefined);
            valueChange(undefined);
            e.stopPropagation();
          }}
        />
      </div>
      {isOpen && (
        <div className="absolute z-20 mt-1 w-fit rounded-md border border-gray-300 bg-gray-50 p-2">
          <div className="mb-2 flex items-center gap-2">
            <Search />
            <input
              value={search}
              className="rounded-md border border-gray-300 p-1 px-2"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ul>
            {options
              .filter((option) =>
                option[labelKey].toLowerCase().includes(lowerCaseSearch),
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
