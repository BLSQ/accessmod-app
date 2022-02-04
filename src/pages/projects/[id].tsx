import { gql } from "@apollo/client";
import { addApolloState, getApolloClient } from "libs/apollo";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "libs/types";
import { withUserRequired } from "libs/withUser";
import { useProjectPageQuery } from "libs/graphql";
import { PageHeader } from "components/layouts/Layout";
import Block from "components/Block";

const QUERY = gql`
  query ProjectPage($id: String!) {
    accessmodProject(id: $id) {
      id
      name
    }
  }
`;

const ProjectsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { loading, data } = useProjectPageQuery({
    variables: { id: router.query.id as string },
  });

  if (loading || !data) {
    return (
      <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
        Loading...
      </div>
    );
  }

  return (
    <>
      <PageHeader>
        <h1 className="text-3xl font-bold text-white">
          {data.accessmodProject?.name}
        </h1>
      </PageHeader>
      <Block>zzz</Block>
    </>
  );
};

export const getServerSideProps = withUserRequired({
  getServerSideProps: async (ctx) => {
    const client = getApolloClient({ headers: ctx.req?.headers });
    await client.query({
      query: QUERY,
      variables: { id: ctx.params.id },
    });

    return addApolloState(client);
  },
});

export default ProjectsPage;
