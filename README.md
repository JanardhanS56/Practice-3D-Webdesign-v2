# Practice-3D-Webdesign-v2

An interactive storefront concept for **VÉRITÉ BOTANIQUE**, a fictional botanical hair-care brand. The experience combines responsive product storytelling with interactive 3D product views and shopping, diagnostic, and product-information interfaces.

## Features

- Interactive 3D bottle and product-formula showcases
- Botanical extraction story and pipette interaction
- Scalp diagnostic quiz and in-page product cart
- Product dossiers, privacy information, and sourcing transparency panels
- Optional ambient soundscape
- Express API with product, diagnostic, batch-verification, and newsletter routes

## Tech stack

- React 18 and Vite
- Three.js
- Tailwind CSS
- Express

## Requirements

- Node.js 18 or newer
- npm

## Getting started

Install dependencies and start the frontend:

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite (by default, `http://localhost:3000`).

To run the Express API, start it in a second terminal:

```bash
npm run server
```

The API listens on port `5000` by default. Vite proxies `/api` requests to it during development.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run server` | Start the Express API |

## Project layout

```text
src/
  components/  Interactive page sections and dialogs
  data/        Product data used by the storefront
  utils/       3D label and soundscape helpers
server/        Express API
```

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for the local development and pull request workflow.

## License

This project is distributed under the MIT License. See [LICENSE](./LICENSE).
