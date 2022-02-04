import Block from "components/Block";
import { PageHeader } from "components/layouts/Layout";
import { withUserRequired } from "libs/withUser";

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

export const getServerSideProps = withUserRequired();

export default HomePage;
