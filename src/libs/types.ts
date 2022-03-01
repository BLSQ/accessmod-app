import type { AppProps } from "next/app";
import type { NextPage } from "next";
import type { ReactElement } from "react";

export type NextPageWithLayout<T = any> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactElement;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
