import Block from "components/Block";
import Breadcrumbs from "components/Breadcrumbs";
import Layout, { Page } from "components/layouts/Layout";
import { PageContent, PageHeader } from "components/layouts/Layout/PageContent";
import AccessRequestsTable from "features/admin/AccessRequestsTable";
import { createGetServerSideProps } from "libs/page";
import { routes } from "libs/router";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

type Variables = {
  page: number;
  perPage: number;
};

const AccessRequestsPage = ({
  defaultVariables,
}: {
  defaultVariables: Variables;
}) => {
  const { t } = useTranslation();

  return (
    <Page title={t("Access Requests")}>
      <PageHeader>
        <Breadcrumbs>
          <Breadcrumbs.Part>{t("Administration")}</Breadcrumbs.Part>
          <Breadcrumbs.Part href={routes.admin_access_requests}>
            {t("Access Requests")}
          </Breadcrumbs.Part>
        </Breadcrumbs>
        <h1 className="mt-4 text-3xl font-bold text-white">
          {t("Access Requests")}
        </h1>
      </PageHeader>
      <PageContent>
        <Block>
          <AccessRequestsTable />
        </Block>
      </PageContent>
    </Page>
  );
};

export const getServerSideProps = createGetServerSideProps({
  requireAuth: true,
  getServerSideProps: async (ctx, client) => {
    await Layout.prefetch(client);
    await AccessRequestsTable.prefetch(client, {});
  },
});

export default AccessRequestsPage;
