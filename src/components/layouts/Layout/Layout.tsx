import type { ReactElement } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import { CustomApolloClient } from "libs/apollo";

type LayoutProps = {
  children: ReactElement;
  header?: ReactElement | null;
};

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};

Layout.prefetch = async (client: CustomApolloClient) => {
  await Header.prefetch(client);
};

export default Layout;
