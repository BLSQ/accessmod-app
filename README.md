# AccessMod app

This repository contains the code of the frontend application of the AccessMod project.

## Architecture overview

The AccessMod application is a [Next.js](https://nextjs.org/) application. It is a frontend app designed to connect
to an [OpenHexa](https://github.com/BLSQ/openhexa-app) instance.

The app communicates with OpenHexa through its [GraphQL](https://graphql.org/) API, and uses the standard OpenHexa
cookie-based authentication.

## Deployment

The project is meant to be deployed in a containerized environment, such as [Kubernetes](https://kubernetes.io/).

The following environment variables should be provided at build time:

- `RELEASE`: a release identifier, such as a Git tag (used for uploading source maps to Sentry)
- `SENTRY_AUTH_TOKEN`: A valid Sentry authentication token
- `NEXT_PUBLIC_SENTRY_DSN`: the [Sentry](https://sentry.io/) DSN

The following environment variables should be provided at run time:
- `NEXT_PUBLIC_GRAPHQL_ENDPOINT`: the URL of the OpenHexa GraphQL API
- `NEXT_PUBLIC_RELEASE`: a release identifier used in-app (should be the same as `SENTRY_RELEASE`)
- `SENTRY_RELEASE`: a release identifier used for Sentry (such as a Git tag)
- `NEXT_PUBLIC_SENTRY_DSN`: the [Sentry](https://sentry.io/) DSN

If you use the provided `Dockerfile`, `NEXT_PUBLIC_RELEASE` and `SENTRY_RELEASE` are set for you if you provide `RELEASE` at build time and `NEXT_PUBLIC_SENTRY_DSN` is already set.

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

Finally, run the development server:

```bash
npm run watch
# or
yarn watch
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## I18N

To extract new strings from the `src/` directory, run the extract command:

```bash
npm run i18n:extract
```

Translations are stored in `public/locales/[lang]/[ns].json`.
