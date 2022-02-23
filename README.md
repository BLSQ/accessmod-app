# AccessMod app

This repository contains the code of the frontend application of the AccessMod project.

## Local development

First, install the dependencies

```bash
npm install
# or
yarn
```

Then, copy the sample `.env.local.dist` and adapt it to your needs:

```bash
cp .env.local.dist .env.local
```

Prepare the pre-commit git hooks

```bash
npm run prepare
```

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## I18N

To extract new strings from the `src/` directory, run the extract command:

```bash
npm run i18n:extract
```

Translations are stored in `public/locales/[lang]/[ns].json`.
