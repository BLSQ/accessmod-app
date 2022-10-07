# AccessMod app

This repository contains the code of the frontend application of the AccessMod project.

Docker image can be found in the 
[Github package repository](https://github.com/BLSQ/accessmod-app/pkgs/container/accessmod-app).

## Architecture overview

The AccessMod application is a [Next.js](https://nextjs.org/) application. It is a frontend app designed to connect
to an [OpenHexa](https://github.com/BLSQ/openhexa-app) instance.

The app communicates with OpenHexa through its [GraphQL](https://graphql.org/) API, and uses the standard OpenHexa
cookie-based authentication.

## Deployment

The project is meant to be deployed in a containerized environment, such as [Kubernetes](https://kubernetes.io/).

The following environment variables should be provided at build time (for the `docker build` or `npm run build`):

- `RELEASE`: a release identifier, such as a Git tag (used for uploading source maps to Sentry)
- `SENTRY_AUTH_TOKEN`: A valid Sentry authentication token

The following environment variables should be provided at run time:
- `GRAPHQL_ENDPOINT`: the URL of the OpenHexa GraphQL API
- `SENTRY_DSN`: the [Sentry](https://sentry.io/) DSN
- `SENTRY_TRACES_SAMPLE_RATE`: the [Sentry](https://sentry.io/) sampling rate of traces
- `SENTRY_ENVIRONMENT`: the [Sentry](https://sentry.io/) environment tag

## Local development

First, install the dependencies

```bash
npm install
```

Then, copy the sample `.env.local.dist` and adapt it to your needs:

```bash
cp .env.local.dist .env.local
```

Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## NPM Scripts

* `npm run dev`: Launch Nextjs in dev mode and watch files to extract graphql code and generate typescript types and hooks
* `npm run next`: Launch only the Nextjs app in dev mode
* `npm run build`: Build the Nextjs app
* `npm run start`: Start the app from the build directory (it has to be built before) 
* `npm run test`: Run the tests in watch mode
* `npm run test:ci`: Run all the tests in CI mode
* `npm run lint`: Lint files in `src/` using `eslint`
* `npm run format`: Format files in `src/` using `prettier`
* `npm run prepare`: This script is called automatically by npm on `npm install`. It adds the pre-commit hook
* `npm run schema`: Run an introspection query on the graphql backend and generate a `schema.graphql` file. This file is used to generate typescript types & for DX in the IDE
* `npm run codegen`: Generate typescript types found in all the files based on `schema.graphql`
* `npm run i18n:extract`: Extract translatable strings and write `messages.json` files for each language


## Translations Management

To extract new strings from the `src/` directory, run the extract command:

```bash
npm run i18n:extract
```

Translations are stored in `public/locales/[lang]/[namespace].json`. The default `namespace` is `messages`.
