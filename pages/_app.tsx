import type { ReactElement, ReactNode } from "react"
import type { AppProps } from "next/app"
import type { NextPage } from "next"
import Head from "next/head"
import { ApolloProvider } from "@apollo/client"
import { useApollo } from "libs/apollo"
import DefaultLayout from "components/layouts/DefaultLayout"

import "../styles/globals.css"

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  const apolloClient = useApollo(pageProps)
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </ApolloProvider>
  )
}

export default App
