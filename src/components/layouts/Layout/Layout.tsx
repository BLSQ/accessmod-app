import type { ReactElement } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";

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

export default Layout;
