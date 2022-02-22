import Block from "components/Block";
import Layout, { PageHeader } from "components/layouts/Layout";
import { createGetServerSideProps } from "libs/page";

const HomePage = () => {
  return (
    <>
      <PageHeader>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
      </PageHeader>
      <Block>Nothing to display on the homepage yet</Block>
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
