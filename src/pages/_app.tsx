import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "libs/apollo";
import Layout from "components/layouts/Layout";
import { AppPropsWithLayout } from "libs/types";

import "../styles/globals.css";

function App({ Component, pageProps }: AppPropsWithLayout) {
  const apolloClient = useApollo(pageProps);

  const getHeader = Component.getHeader ?? (() => null);
  const getLayout =
    Component.getLayout ??
    ((page) => <Layout header={getHeader(page)}>{page}</Layout>);

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

export default App;
