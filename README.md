# VOXA — Creative Portfolio

A cinematic Arabic-first portfolio built with React, TypeScript, Vite, Tailwind CSS v4 and Motion.

## Requirements

- Node.js 22+
- npm 10+

## Local development

```bash
npm ci
npm run dev
```

## Validation and production build

```bash
npm run typecheck
npm run build
npm run preview
```

The production output is generated in `dist/`. Vercel should use the **Vite** framework preset, run `npm ci` for installation, `npm run build` for the build command, and `dist` as the output directory.

## Project structure

- `src/main.tsx`: React entry point.
- `src/App.tsx`: page composition.
- `src/components/`: portfolio sections and reusable UI.
- `src/data.ts`: portfolio project, reel and service content.
- `src/lib/`: scrolling and formatting utilities.
- `src/index.css`: global styles and design tokens.
- `vite.config.ts`: Vite, React and Tailwind CSS v4 configuration.

Update the social links and portfolio content before publishing the site publicly.
