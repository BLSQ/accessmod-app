import Link from "next/link";
import Image from "next/image";
import Button from "components/Button";
import UserMenu from "./UserMenu";
import Navbar from "./Navbar";

import CreateProjectDialog from "features/project/CreateProjectDialog";
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
      <nav className="bg-lochmara">
        <div className="mx-auto max-w-5xl sm:px-4 md:px-8">
          <div className="border-b border-white">
            <div className="flex h-16 items-center justify-between px-4 sm:px-0">
              <div className="flex h-full items-center gap-5 text-white">
                <div className="flex-shrink-0">
                  <Link href="/">
                    <a className="flex">
                      <Image
                        priority
                        alt="who logo"
                        src="/images/WHO-logo-watermark-white.png"
                        layout="fixed"
                        height="37"
                        width="121"
                      />
                    </a>
                  </Link>
                </div>
                <div className="text-bold text-xl uppercase ">
                  {t("Access Mod")}
                </div>
                <Navbar />
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Button
                    variant="primary"
                    className="mr-7"
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
