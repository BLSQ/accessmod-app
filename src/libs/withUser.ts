import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { gql } from "@apollo/client";
import { ParsedUrlQuery } from "querystring";

import { getApolloClient } from "libs/apollo";

type WithUserRequiredOptions<
  P = any,
  Q extends ParsedUrlQuery = ParsedUrlQuery
> = {
  getServerSideProps?: (ctx: any) => any;
  returnTo?: string;
};

export type GetServerSidePropsResultWithUser<P = any> =
  GetServerSidePropsResult<P & { user?: null }>;

export function withUserRequired(options: WithUserRequiredOptions = {}) {
  const { getServerSideProps, returnTo } = options;

  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResultWithUser> => {
    const client = getApolloClient({ headers: ctx.req?.headers });
    const payload = await client.query({
      query: gql`
        query MeQuery {
          me {
            email
            id
          }
        }
      `,
    });

    if (!payload.data.me) {
      return {
        props: {},
        redirect: {
          destination: `/login?returnTo=${encodeURIComponent(
            returnTo || ctx.resolvedUrl
          )}`,
          permanent: false,
        },
      };
    } else {
      let ret: any = { props: {} };
      if (getServerSideProps) {
        ret = await getServerSideProps(ctx);
      }

      return {
        ...ret,
        props: {
          user: payload.data.me,
          ...ret.props,
        },
      };
    }
  };
}
