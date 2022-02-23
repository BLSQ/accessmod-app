import Link from "next/link";
import Image from "next/image";
import Button from "components/Button";
import UserMenu from "./UserMenu";
import Navbar from "./Navbar";

import CreateProjectDialog from "features/CreateProjectDialog";
import { useState } from "react";
import { CustomApolloClient } from "libs/apollo";
import { useTranslation } from "next-i18next";
import { UserMenu_UserFragment } from "libs/graphql";

type Props = {
  user: UserMenu_UserFragment;
};

const Header = ({ user }: Props) => {
  const [showProjectDialog, setProjectDialog] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <div className="bg-who-blue-main pb-32">
        <nav className="mb-10">
          <div className="max-w-8xl mx-auto sm:px-4 lg:px-8">
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
                  <div className="text-xl text-bold uppercase ">
                    {t("Access Mod")}
                  </div>
                  <Navbar />
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <Button
                      variant="primary"
                      className="mr-4"
                      onClick={() => setProjectDialog(true)}
                    >
                      {t("New Project")}
                    </Button>

                    <UserMenu user={user} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <CreateProjectDialog
        open={showProjectDialog}
        onClose={() => setProjectDialog(false)}
      />
    </>
  );
};

Header.prefetch = async (client: CustomApolloClient) => {
  await Navbar.prefetch(client);
};

export default Header;
