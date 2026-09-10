/**
 * Extra terms a record can be found by but which are never displayed. When you
 * rename something in scripts/overrides.js the upstream name is pushed here
 * automatically, so a rename never makes a place unsearchable.
 */
type Searchable = { aliases?: string[] };

export type Country = Searchable & {
  /** ISO 3166-1 alpha-2, e.g. "US". The key used everywhere - never renamed. */
  code: string;
  /** Display name. May be overridden; see scripts/overrides.js. */
  name: string;
  /** Dialling code without the leading "+", e.g. "1". */
  phoneCode: string;
  /** ISO 4217, e.g. "USD". */
  currency: string;
};

export type State = Searchable & {
  /** Subdivision code, unique within its country, e.g. "PA". */
  code: string;
  name: string;
};

export type City = Searchable & {
  /** GeoNames id. Stable enough to key overrides on; use for list keys too. */
  id: number;
  name: string;
};

/**
 * Cities keyed by state code. Pre-grouped at build time so looking up one
 * state's cities is a property access rather than a scan.
 */
export type CityIndex = Record<string, City[]>;
