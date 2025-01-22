import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { createPortal } from "react-dom";

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

  const panelRef = useRef<null | HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        event.target instanceof Element &&
        !panelRef.current.contains(event.target)
      ) {
        event.stopPropagation();
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, []);

  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const updatePosition = () => {
      const rect = triggerRef.current!.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  const lowerCaseSearch = search.toLowerCase();

  return (
    <div ref={triggerRef}>
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
      {isOpen &&
        createPortal(
          <div
            className="mt-1 w-fit rounded-md border border-gray-300 bg-gray-50 p-2"
            ref={panelRef}
            style={{
              position: "absolute",
              zIndex: 20,
              ...position,
            }}
          >
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
          </div>,
          document.body,
        )}
    </div>
  );
};
