import type { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "components/Button";
import UserMenu from "./UserMenu";
import Footer from "./Footer";
import Main from "./Main";
import Navbar from "./Navbar";

type LayoutProps = {
  children: ReactElement;
  header?: ReactElement | null;
};

type HeaderProps = {
  children?: ReactElement | null;
};

const Header = (props: HeaderProps) => {
  const { children } = props;
  return (
    <div className="bg-who-blue-main pb-32">
      <nav>
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
          <div className="border-b border-white">
            <div className="flex items-center justify-between h-16 px-4 sm:px-0">
              <div className="flex items-center gap-5 text-white h-full">
                <div className="flex-shrink-0">
                  <Link href="/">
                    <a className="flex">
                      <Image
                        alt="who logo"
                        src="/images/WHO-logo-watermark-white.png"
                        layout="fixed"
                        height="37"
                        width="121"
                      />
                    </a>
                  </Link>
                </div>
                <div className="text-xl text-bold uppercase ">Access Mod</div>
                <Navbar />
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Button variant="primary" className="mr-4">
                    New Project
                  </Button>
                  <UserMenu />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <header className="py-10">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </header>
    </div>
  );
};

const Layout = (props: LayoutProps) => {
  const { children, header } = props;
  return (
    <div className="min-h-screen flex flex-col">
      <Header>{header}</Header>
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};

export default Layout;
