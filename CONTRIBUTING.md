# Contributing

Thanks for helping out.

## Setup

    corepack enable
    yarn install
    yarn generate    # needs Node 18+ for global fetch
    yarn build

## Developer Certificate of Origin

All commits must be signed off:

    git commit -s -m "your message"

This adds a `Signed-off-by:` line certifying you wrote the patch or otherwise
have the right to submit it under the MIT licence in `LICENSE`. You keep
copyright in your contribution; the project distributes it under MIT.

## Data changes

Never hand-edit `src/generated/**` — it is overwritten by `yarn generate`.
Change `SUPPORTED` or the transform logic in `scripts/generate.mjs` instead.
