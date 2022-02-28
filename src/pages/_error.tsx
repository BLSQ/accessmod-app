import { NextPageWithLayout } from "libs/types";
import { NextPageContext } from "next";
import Error from "next/error";
import { ReactElement } from "react";

type Props = {
  statusCode: number;
};

const ErrorPage: NextPageWithLayout<Props> = ({ statusCode }) => {
  return <Error statusCode={statusCode} />;
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  if (res && res.statusCode) {
    return { statusCode: res.statusCode };
  }
  return { statusCode: err?.statusCode ?? 404 };
};

ErrorPage.getLayout = (page: ReactElement) => page;

export default ErrorPage;
