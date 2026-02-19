export interface CountryDialCodeOption {
  key: string;
  iso2: string;
  country: string;
  dialCode: string;
  flag: string;
  formatHint: string;
  priority: boolean;
}

const PRIORITY_ISO2 = ['AU', 'CA', 'GB', 'US'];

const FORMAT_HINT_BY_ISO2: Record<string, string> = {
  US: 'Area code + number',
  CA: '(###) ###-####',
  GB: '#### ### ####',
  AU: '(##) #### ####',
  AR: '## #### ####',
};

export const DEFAULT_COUNTRY_DIAL_CODE_OPTIONS: CountryDialCodeOption[] = [
  { key: 'AU:+61', iso2: 'AU', country: 'Australia', dialCode: '+61', flag: '🇦🇺', formatHint: '(##) #### ####', priority: true },
  { key: 'CA:+1', iso2: 'CA', country: 'Canada', dialCode: '+1', flag: '🇨🇦', formatHint: '(###) ###-####', priority: true },
  { key: 'GB:+44', iso2: 'GB', country: 'United Kingdom', dialCode: '+44', flag: '🇬🇧', formatHint: '#### ### ####', priority: true },
  { key: 'US:+1', iso2: 'US', country: 'United States', dialCode: '+1', flag: '🇺🇸', formatHint: '(###) ###-####', priority: true },
];

interface RestCountry {
  cca2?: string;
  flag?: string;
  name?: { common?: string };
  idd?: { root?: string; suffixes?: string[] };
}

const flagFromIso2 = (iso2: string): string => (
  iso2
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
);

const toOption = (country: RestCountry): CountryDialCodeOption[] => {
  const iso2 = country.cca2?.toUpperCase();
  const countryName = country.name?.common?.trim();
  const root = country.idd?.root?.trim();
  const rawSuffixes = country.idd?.suffixes ?? [];

  if (!iso2 || !countryName || !root) {
    return [];
  }

  const priority = PRIORITY_ISO2.includes(iso2);
  const formatHint = FORMAT_HINT_BY_ISO2[iso2] ?? '##########';
  const flag = country.flag ?? flagFromIso2(iso2);
  const normalizedSuffixes = (iso2 === 'US' || iso2 === 'CA')
    ? ['']
    : rawSuffixes.map((suffix) => (suffix ?? '').trim()).filter((suffix) => suffix.length > 0);

  if (normalizedSuffixes.length === 0) {
    return [];
  }

  return normalizedSuffixes.map((suffix) => {
    const dialCode = `${root}${suffix}`.replace(/\s+/g, '');
    return {
      key: `${iso2}:${dialCode}`,
      iso2,
      country: countryName,
      dialCode,
      flag,
      formatHint,
      priority,
    };
  });
};

let cachedCountryOptionsPromise: Promise<CountryDialCodeOption[]> | null = null;

export function loadCountryDialCodeOptions(): Promise<CountryDialCodeOption[]> {
  if (cachedCountryOptionsPromise) {
    return cachedCountryOptionsPromise;
  }

  cachedCountryOptionsPromise = fetch('https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch country calling codes: ${response.status}`);
      }
      return response.json() as Promise<RestCountry[]>;
    })
    .then((countries) => {
      const byKey = new Map<string, CountryDialCodeOption>();
      countries.flatMap(toOption).forEach((option) => {
        if (!byKey.has(option.key)) {
          byKey.set(option.key, option);
        }
      });

      const allOptions = Array.from(byKey.values());
      const priorityOrder = new Map(PRIORITY_ISO2.map((iso2, index) => [iso2, index]));

      allOptions.sort((a, b) => {
        if (a.priority !== b.priority) {
          return a.priority ? -1 : 1;
        }
        if (a.priority && b.priority) {
          const aRank = priorityOrder.get(a.iso2) ?? 999;
          const bRank = priorityOrder.get(b.iso2) ?? 999;
          if (aRank !== bRank) {
            return aRank - bRank;
          }
        }

        const countryCompare = a.country.localeCompare(b.country);
        if (countryCompare !== 0) {
          return countryCompare;
        }
        return a.dialCode.localeCompare(b.dialCode);
      });

      return allOptions.length > 0 ? allOptions : DEFAULT_COUNTRY_DIAL_CODE_OPTIONS;
    })
    .catch(() => DEFAULT_COUNTRY_DIAL_CODE_OPTIONS);

  return cachedCountryOptionsPromise;
}
