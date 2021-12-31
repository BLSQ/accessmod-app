import type { ReactElement, ReactNode } from "react"
import type { AppProps } from "next/app"
import type { NextPage } from "next"
import { ApolloProvider } from "@apollo/client"
import client from "apollo-client"
import DefaultLayout from "components/layouts/DefaultLayout"

import "../styles/globals.css"

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <ApolloProvider client={client}>
      {getLayout(<Component {...pageProps} />)}
    </ApolloProvider>
  )
}

export default App
