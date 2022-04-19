import { CustomApolloClient } from "libs/apollo";
import type { ReactElement } from "react";
import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children: ReactElement;
  pageProps: any;
  header?: ReactElement | null;
};

const Layout = (props: LayoutProps) => {
  const { children, pageProps } = props;
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 ">
      {pageProps.user && <Header user={pageProps.user} />}
      {children}
      <Footer />
    </div>
  );
};

Layout.prefetch = async (client: CustomApolloClient) => {
  await Header.prefetch(client);
};

export default Layout;
