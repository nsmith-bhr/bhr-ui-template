import { useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon';
import {
  DEFAULT_COUNTRY_DIAL_CODE_OPTIONS,
  loadCountryDialCodeOptions,
  type CountryDialCodeOption,
} from '../../services/countryDialCodeService';

interface CountryCodePhoneInputProps {
  label: string;
  countryKey: string;
  phoneNumber: string;
  onCountryChange: (countryKey: string) => void;
  onPhoneNumberChange: (phoneNumber: string) => void;
}

export function CountryCodePhoneInput({
  label,
  countryKey,
  phoneNumber,
  onCountryChange,
  onPhoneNumberChange,
}: CountryCodePhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [countryOptions, setCountryOptions] = useState<CountryDialCodeOption[]>(DEFAULT_COUNTRY_DIAL_CODE_OPTIONS);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const selectedCountry = countryOptions.find((option) => option.key === countryKey) ?? countryOptions[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    let isMounted = true;
    loadCountryDialCodeOptions().then((options) => {
      if (isMounted) {
        setCountryOptions(options);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const formatPhoneNumber = (value: string, selectedOption: CountryDialCodeOption): string => {
    if (selectedOption.iso2 === 'US') {
      // For US, keep +1 in selector and let users type area code/number directly.
      return value.replace(/[^\d\s().-]/g, '').slice(0, 14);
    }

    const dialCode = selectedOption.dialCode;
    const digits = value.replace(/\D/g, '');

    if (dialCode === '+1') {
      const p1 = digits.slice(0, 3);
      const p2 = digits.slice(3, 6);
      const p3 = digits.slice(6, 10);
      if (!p1) return '';
      if (!p2) return `(${p1}`;
      if (!p3) return `(${p1}) ${p2}`;
      return `(${p1}) ${p2}-${p3}`;
    }

    if (dialCode === '+44' || dialCode === '+61') {
      const p1 = digits.slice(0, 4);
      const p2 = digits.slice(4, 7);
      const p3 = digits.slice(7, 11);
      return [p1, p2, p3].filter(Boolean).join(' ');
    }

    if (dialCode === '+54') {
      const p1 = digits.slice(0, 2);
      const p2 = digits.slice(2, 6);
      const p3 = digits.slice(6, 10);
      return [p1, p2, p3].filter(Boolean).join(' ');
    }

    return digits.slice(0, 12);
  };

  const normalizedSearch = searchQuery.trim().toLowerCase();
  const filteredOptions = countryOptions.filter((option) => (
    normalizedSearch.length === 0
      || option.country.toLowerCase().includes(normalizedSearch)
      || option.dialCode.replace(/\s/g, '').includes(normalizedSearch.replace(/\s/g, ''))
      || option.iso2.toLowerCase().includes(normalizedSearch)
  ));

  const prioritizedOptions = filteredOptions.filter((option) => option.priority);
  const alphabeticalOptions = filteredOptions
    .filter((option) => !option.priority)
    .sort((a, b) => {
      const byCountry = a.country.localeCompare(b.country);
      if (byCountry !== 0) return byCountry;
      return a.dialCode.localeCompare(b.dialCode);
    });

  return (
    <div className="flex flex-col gap-2" ref={containerRef}>
      <label className="text-[14px] font-medium leading-[20px] text-[var(--text-neutral-x-strong)]">
        {label}
      </label>

      <div className="relative">
        <div
          className="
            flex items-center h-10
            bg-[var(--surface-neutral-white)]
            border border-[var(--border-neutral-medium)]
            rounded-[var(--radius-xx-small)]
            overflow-hidden
          "
          style={{ boxShadow: '1px 1px 0px 1px rgba(56,49,47,0.04)' }}
        >
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className={`
              h-8 ml-1 mr-[10px] px-2 rounded-[6px]
              flex items-center gap-1.5 text-[15px] leading-[22px] text-[var(--text-neutral-strong)]
              transition-colors
              ${isOpen ? 'bg-[var(--surface-neutral-x-weak)]' : 'hover:bg-[var(--surface-neutral-xx-weak)]'}
            `}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <Icon
              name="caret-down"
              size={12}
              className={`text-[var(--icon-neutral-strong)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
            <CountryFlag iso2={selectedCountry.iso2} country={selectedCountry.country} fallback={selectedCountry.flag} />
            <span>{selectedCountry.dialCode}</span>
          </button>

          <div className="w-px h-6 bg-[var(--border-neutral-medium)] shrink-0" />

          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => onPhoneNumberChange(formatPhoneNumber(e.target.value, selectedCountry))}
            className="flex-1 min-w-0 h-full pl-3 pr-3 bg-transparent text-[15px] leading-[22px] text-[var(--text-neutral-strong)] placeholder:text-[var(--text-neutral-weak)] outline-none"
            placeholder={selectedCountry.formatHint}
          />
        </div>

        {isOpen && (
          <div
            className="
              absolute z-50 top-full left-0 mt-2
              w-[279px]
              bg-[var(--surface-neutral-white)]
              border border-[var(--border-neutral-weak)]
              rounded-[var(--radius-xx-small)]
              overflow-hidden
            "
            style={{ boxShadow: '3px 3px 10px 2px rgba(56, 49, 47, 0.10)' }}
          >
            <div className="pt-3">
              <div className="px-4 h-[35px] flex items-center gap-2">
                <Icon name="magnifying-glass" size={14} className="text-[var(--icon-neutral-xx-strong)]" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-[15px] leading-[22px] text-[var(--text-neutral-strong)] placeholder:text-[var(--text-neutral-weak)] outline-none"
                  placeholder="Search..."
                />
              </div>
              <div className="h-px bg-[var(--border-neutral-x-weak)]" />
            </div>

            <div className="max-h-[378px] overflow-y-auto">
              {prioritizedOptions.map((option) => (
                <CountryOptionRow
                  key={option.key}
                  option={option}
                  isSelected={option.key === selectedCountry.key}
                  onSelect={() => {
                    onCountryChange(option.key);
                    onPhoneNumberChange(formatPhoneNumber(phoneNumber, option));
                    setIsOpen(false);
                  }}
                />
              ))}

              {prioritizedOptions.length > 0 && alphabeticalOptions.length > 0 && (
                <div className="h-px bg-[var(--border-neutral-x-weak)]" />
              )}

              {alphabeticalOptions.map((option) => (
                <CountryOptionRow
                  key={option.key}
                  option={option}
                  isSelected={option.key === selectedCountry.key}
                  onSelect={() => {
                    onCountryChange(option.key);
                    onPhoneNumberChange(formatPhoneNumber(phoneNumber, option));
                    setIsOpen(false);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CountryOptionRow({
  option,
  isSelected,
  onSelect,
}: {
  option: CountryDialCodeOption;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className={`
        w-full h-[42px] px-4 py-[10px] text-left
        flex items-center gap-2
        transition-colors
        ${isSelected ? 'bg-[var(--surface-neutral-x-weak)]' : 'hover:bg-[var(--surface-neutral-xx-weak)]'}
      `}
      onClick={onSelect}
    >
      <CountryFlag iso2={option.iso2} country={option.country} fallback={option.flag} />
      <span className="text-[15px] leading-[22px] text-[var(--text-neutral-x-strong)]">
        {option.country} {option.dialCode}
      </span>
    </button>
  );
}

function CountryFlag({
  iso2,
  country,
  fallback,
}: {
  iso2: string;
  country: string;
  fallback: string;
}) {
  const [hasImageError, setHasImageError] = useState(false);
  const code = iso2.toLowerCase();
  const src = `https://flagcdn.com/w40/${code}.png`;

  return (
    <span className="relative size-5 shrink-0 rounded-full overflow-hidden border border-white">
      {!hasImageError ? (
        <img
          src={src}
          alt={`${country} flag`}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setHasImageError(true)}
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center text-[14px] leading-none bg-[var(--surface-neutral-x-weak)]">
          {fallback}
        </span>
      )}
      <span className="absolute inset-0 bg-gradient-to-b from-[rgba(255,255,255,0.35)] to-[rgba(0,0,0,0.12)] pointer-events-none" />
    </span>
  );
}

export default CountryCodePhoneInput;
