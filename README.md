# IMPORTANT
This is the codebase for the Cosmic API v2. For the latest docs, go to https://www.cosmicjs.com/docs.

# Cosmic Docs API v2

This is the codebase for the [Cosmic docs v2](https://docs-v2.cosmicjs.com/).

## Development

### Installation

The Nextra repository uses [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces). To install dependencies, just simply run `yarn` in the project root directory.

### Build Nextra Theme

```
cd packages/nextra-theme-docs
yarn build
```

Watch mode: `yarn dev`
Watch mode (layout only): `yarn dev:layout`
Watch mode (style only): `yarn dev:tailwind`

### Development

To start Cosmic Docs locally, run

```
cd cosmic-docs
yarn dev
```

Any change to cosmic-docs will be re-rendered instantly.

If you update the core or theme packages, a rebuild is required. Or you can use the watch mode for both nextra and the theme in separated terminals.
