# @ctw/geo

Typed country / state / city data. Countries load eagerly (~12 KB); states and
cities load lazily as one code-split chunk per country.

```bash
npm install @ctw/geo   # or: yarn add @ctw/geo / pnpm add @ctw/geo
```

```ts
import { countries, loadStates, loadCitiesInState } from "@ctw/geo";

countries; // Country[] - available immediately
await loadStates("US"); // State[]   - ~2 KB chunk
await loadCitiesInState("US", "PA"); // City[]    - O(1) after first load
```

## API

| Export                              | Returns                | Notes                        |
| ----------------------------------- | ---------------------- | ---------------------------- |
| `countries`                         | `Country[]`            | Eager. ~12 KB.               |
| `getCountry(code)`                  | `Country \| undefined` | Lookup by ISO2.              |
| `loadStates(countryCode)`           | `Promise<State[]>`     | Lazy chunk.                  |
| `loadCityIndex(countryCode)`        | `Promise<CityIndex>`   | Cities keyed by state code.  |
| `loadCitiesInState(country, state)` | `Promise<City[]>`      | Property read, no filtering. |

Unknown codes return `[]` / `{}` rather than throwing.

## Performance

Cities are grouped by state code **at build time**, so no scanning happens at
runtime. Dynamic `import()` is cached by the module system, so repeated calls
for the same country do not re-fetch. `sideEffects: false` lets bundlers drop
anything you don't import.

## Adding a country

Edit `SUPPORTED` in `scripts/generate.mjs`, then:

```bash
yarn generate && yarn build
```

## Contributing

Yarn 4 via Corepack (`corepack enable`, then `yarn install`). `yarn generate`
needs **Node 18+** for global `fetch`; building and consuming the package do not.

## Licence

Code is MIT. **Data is ODbL-1.0** and must stay ODbL — see `ATTRIBUTION.md`.
