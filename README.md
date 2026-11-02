# Garage Studio

Garage Studio is a local-first personal garage and car expense tracker built with React, TypeScript, Vite, Tailwind CSS, Dexie, Recharts, React Hook Form, and React Three Fiber.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.

## What is included

- Hungarian automotive dashboard with responsive desktop sidebar and mobile bottom navigation.
- Vehicle creation and editing with validation, optional photo uploads, and self-contained `.glb` model uploads.
- Interactive GLB viewer with orbit controls, auto-rotate, reset, local object URLs, and lazy loading.
- IndexedDB persistence for vehicles, fuel records, services, expenses, finance plans, and payments.
- Calculated dashboard totals, monthly expense trend, category breakdown, fuel consumption estimate, and activity history.
- Local JSON backup export/import and an explicit browser-only data privacy explanation.

## Storage behavior

Structured records and uploaded vehicle blobs are stored in IndexedDB under the `garage-studio` database. The selected vehicle is stored as a lightweight `localStorage` preference. No account, backend, or automatic cloud sync is used.

Browser storage is not permanent or guaranteed. Clearing browser data can remove the garage, so export backups regularly. JSON import merges records by ID; it does not silently erase the current garage.

## Supported files

- Vehicle photo: browser-supported image files such as JPG and PNG.
- Vehicle model: self-contained `.glb` files. External URLs and separate texture folders are not supported.

The current backup export is a portable JSON record backup. Uploaded binary attachments remain in the browser's IndexedDB and are not embedded into the JSON file.