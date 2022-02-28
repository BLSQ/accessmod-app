import Block from "components/Block";
import Layout from "components/layouts/Layout";
import { PageHeader, PageContent } from "components/layouts/Layout/PageContent";
import { createGetServerSideProps } from "libs/page";
import { useTranslation } from "next-i18next";

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader>
        <h1 className="text-3xl font-bold text-white">{t("Dashboard")}</h1>
      </PageHeader>
      <PageContent>
        <Block>Nothing to display on the homepage yet</Block>
      </PageContent>
    </>
  );
};

export const getServerSideProps = createGetServerSideProps({
  requireAuth: true,
  getServerSideProps: async (ctx, client) => {
    await Layout.prefetch(client);
  },
});

export default HomePage;
