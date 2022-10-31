import useMe from "hooks/useMe";
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
  const { children } = props;
  const me = useMe();
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 ">
      {me?.user && <Header />}
      {children}
      <Footer />
    </div>
  );
};

Layout.prefetch = async (client: CustomApolloClient) => {
  await Header.prefetch(client);
};

export default Layout;
