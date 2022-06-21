import { ApolloProvider } from "@apollo/client";
import AlertManager from "components/AlertManager";
import Layout from "components/layouts/Layout";
import { useApollo } from "libs/apollo";
import { AppPropsWithLayout } from "libs/types";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";
import NavigationProgress from "nextjs-progressbar";
import "../styles/globals.css";

function App({ Component, pageProps }: AppPropsWithLayout) {
  const apolloClient = useApollo(pageProps);

  const getLayout =
    Component.getLayout ??
    ((page) => <Layout pageProps={pageProps}>{page}</Layout>);

  return (
    <>
      <NavigationProgress color="#002C5F" height={3} />
      <ApolloProvider client={apolloClient}>
        <Head>
          <title key="title">AccessMod</title>
          <meta property="og:title" content="AccessMod" key="meta_title" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="" />
        </Head>
        {getLayout(<Component {...pageProps} />)}
        <AlertManager />
      </ApolloProvider>
    </>
  );
}

export default appWithTranslation(App);
