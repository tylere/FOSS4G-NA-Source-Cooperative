# Source Cooperative: cloud-native geospatial data publishing at any scale

Slides for FOSS4G NA 2026 (Nov 4, 10:30) — Tyler Erickson, Radiant Earth. Built with [Slidev](https://sli.dev). Many slides are adapted from Anthony Lukach's [CNG 2026 talk](https://github.com/alukach/slides-2026-cng-building-source-cooperative).

## Run

```sh
pnpm install
pnpm dev       # http://localhost:3030
pnpm build     # static site in dist/
pnpm export    # PDF (live embeds render blank in exports)
```

The Source brand (fonts, colours, logo) comes from `slidev-addon-source`, linked from the private `radiantearth/re-branding` repo, which must be cloned at `../../radiantearth/re-branding` relative to this folder. Berkeley Mono loads from the Radiant Earth CDN, so built output contains no licensed font files.
