import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "libs/apollo";
import Layout from "components/layouts/Layout";
import { AppPropsWithLayout } from "libs/types";
import { appWithTranslation } from "next-i18next";

import "../styles/globals.css";

function App({ Component, pageProps }: AppPropsWithLayout) {
  const apolloClient = useApollo(pageProps);

  const getLayout =
    Component.getLayout ??
    ((page) => <Layout pageProps={pageProps}>{page}</Layout>);

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </ApolloProvider>
  );
}

export default appWithTranslation(App);
