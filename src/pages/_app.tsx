import { ApolloProvider } from "@apollo/client";
import AlertManager from "components/AlertManager";
import Layout from "components/layouts/Layout";
import { useApollo } from "libs/apollo";
import { AppPropsWithLayout } from "libs/types";
import { Settings } from "luxon";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";
import NavigationProgress from "nextjs-progressbar";
import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { MeProvider } from "hooks/useMe";

import "../styles/globals.css";

// Set the default locale & timezone to be used on server and client.
// This should be changed to use the correct lang and tz of the user when it's available.
// Fixes #OPENHEXA-D7 Hydration error
Settings.defaultLocale = "en";
Settings.defaultZone = "Europe/Brussels";

function App({ Component, pageProps }: AppPropsWithLayout) {
  const apolloClient = useApollo(pageProps);
  const { me } = pageProps;
  const getLayout =
    Component.getLayout ??
    ((page) => <Layout pageProps={pageProps}>{page}</Layout>);

  useEffect(() => {
    Sentry.setUser(me?.user ? { email: me.user.email, id: me.user.id } : null);
  }, [me]);

  return (
    <MeProvider me={me}>
      <NavigationProgress color="#002C5F" height={3} />
      <ApolloProvider client={apolloClient}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="" />
        </Head>
        {getLayout(<Component {...pageProps} />)}
        <AlertManager />
      </ApolloProvider>
    </MeProvider>
  );
}

export default appWithTranslation(App);
