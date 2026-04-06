import React, { useEffect, useMemo, useRef, useState } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';

interface DropdownOption {
  label: string;
  value: string;
}

interface CommonDropdownProps {
  options: DropdownOption[];
  defaultValue?: string;
  className?: string;
  onChange?: (value: string) => void;
}

const CommonDropdown: React.FC<CommonDropdownProps> = ({
  options,
  defaultValue = '',
  className = '',
  onChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialValue =
    options.find((option) => option.value === defaultValue)?.value ?? options[0]?.value ?? '';
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const nextValue =
      options.find((option) => option.value === defaultValue)?.value ?? options[0]?.value ?? '';
    setSelectedValue(nextValue);
  }, [defaultValue, options]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const selectedOption = useMemo(
    () =>
      options.find((option) => option.value === selectedValue) ?? options[0] ?? null,
    [options, selectedValue],
  );

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onChange?.(value);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 rounded-full border border-slate-200 bg-white/90 py-2.5 pl-4 pr-4 text-sm font-medium text-slate-700 shadow-sm outline-none transition-all duration-200 hover:border-red-200 hover:bg-white focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">{selectedOption?.label ?? ''}</span>
        <IoChevronDownOutline
          size={16}
          className={`shrink-0 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-red-500' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+10px)] z-50 w-full overflow-hidden rounded-3xl border border-red-100 bg-white p-2 shadow-[0_18px_40px_rgba(15,23,42,0.14)]">
          <div className="flex flex-col gap-1" role="listbox" aria-activedescendant={selectedValue}>
            {options.map((option) => {
              const isSelected = option.value === selectedValue;

              return (
                <button
                  key={`${option.label}-${option.value}`}
                  id={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`rounded-2xl px-4 py-2.5 text-left text-sm font-medium transition-colors duration-200 ${
                    isSelected
                      ? 'bg-[#ff4c3b] text-white'
                      : 'text-slate-700 hover:bg-[#fff4f1] hover:text-red-500'
                  }`}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommonDropdown;
