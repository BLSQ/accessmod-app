import { gql } from "@apollo/client";
import Button from "components/Button";
import Toggle from "components/Toggle";
import CreateProjectDialog from "features/project/CreateProjectDialog";
import useCacheKey from "hooks/useCacheKey";
import { CustomApolloClient } from "libs/apollo";
import { useHeaderQuery } from "libs/graphql";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import UserMenu from "./UserMenu";

const Header = () => {
  const { t } = useTranslation();
  const { data, refetch } = useHeaderQuery();

  useCacheKey("projects", () => refetch());
  if (!data) {
    return null;
  }
  return (
    <>
      <nav className="bg-lochmara">
        <div className="mx-auto max-w-6xl sm:px-4 md:px-8">
          <div className="border-b border-white">
            <div className="flex h-16 items-center justify-between px-4 sm:px-0">
              <div className="flex h-full items-center gap-5 text-white">
                <div className="flex flex-shrink-0">
                  <Image
                    priority
                    alt="who logo"
                    src="/images/WHO-logo-watermark-white.png"
                    layout="fixed"
                    height="37"
                    width="121"
                  />
                </div>
                <div className="text-bold text-xl ">
                  <Link href="/">
                    <a>{t("AccessMod")}</a>
                  </Link>
                </div>
                {data && <Navbar navbar={data} />}
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {data?.me.permissions.createAccessmodProject && (
                    <Toggle>
                      {({ isToggled, toggle }) => (
                        <>
                          <Button
                            variant="primary"
                            className="mr-7"
                            onClick={toggle}
                          >
                            {t("New Project")}
                          </Button>
                          <CreateProjectDialog
                            open={isToggled}
                            onClose={toggle}
                          />
                        </>
                      )}
                    </Toggle>
                  )}

                  <UserMenu me={data.me} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

Header.prefetch = async (client: CustomApolloClient) => {
  await client.query({
    query: gql`
      query Header {
        me {
          permissions {
            createAccessmodProject
          }
          ...UserMenu_me
        }
        ...Navbar_navbar
      }
      ${UserMenu.fragments.me}
      ${Navbar.fragments.navbar}
    `,
  });
};

export default Header;
