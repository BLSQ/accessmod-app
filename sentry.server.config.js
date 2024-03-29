// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

Sentry.init({
  dsn: publicRuntimeConfig.SENTRY_DSN,
  environment: publicRuntimeConfig.SENTRY_ENVIRONMENT,
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampler(context) {
    if (context.location?.pathname === "/ready") {
      return 0;
    }
    return publicRuntimeConfig.SENTRY_TRACES_SAMPLE_RATE;
  },
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
