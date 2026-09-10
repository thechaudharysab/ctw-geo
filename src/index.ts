import countriesData from "./generated/countries.js";
import { cityLoaders, stateLoaders } from "./loaders.js";
import type { City, CityIndex, Country, State } from "./types.js";

export type { City, CityIndex, Country, State } from "./types.js";

const EMPTY_CITIES: City[] = [];

/** Every country in this build. ~12 KB, loaded eagerly. */
export const countries: Country[] = countriesData;

export function getCountry(code: string): Country | undefined {
  return countries.find((country) => country.code === code);
}

/** Lazy. Largest chunk in the full dataset is 6.6 KB. */
export async function loadStates(countryCode: string): Promise<State[]> {
  const loader = stateLoaders[countryCode];

  return loader ? loader() : [];
}

/**
 * Cities for a country, keyed by state code. One lazy chunk per country - the
 * US is the worst case at ~450 KB uncompressed (16,731 cities), roughly 110 KB
 * over the wire. `import()` caches, so calling this repeatedly is free.
 */
export async function loadCityIndex(countryCode: string): Promise<CityIndex> {
  const loader = cityLoaders[countryCode];

  return loader ? loader() : {};
}

/** O(1) after the country's chunk is cached - a property read, not a filter. */
export async function loadCitiesInState(
  countryCode: string,
  stateCode: string,
): Promise<City[]> {
  const index = await loadCityIndex(countryCode);

  return index[stateCode] ?? EMPTY_CITIES;
}
