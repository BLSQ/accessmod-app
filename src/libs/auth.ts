import { gql } from "@apollo/client";
import { GetServerSidePropsContext } from "next";
import Router from "next/router";
import { getApolloClient } from "./apollo";
import { MeQuery } from "./graphql";

export async function getMe(ctx?: GetServerSidePropsContext) {
  const client = getApolloClient({ headers: ctx?.req.headers });
  const payload = await client.query<MeQuery>({
    query: gql`
      query Me {
        me {
          user {
            email
            id
            firstName
            lastName
            avatar {
              initials
              color
            }
          }
        }
      }
    `,
  });

  const me = payload?.data.me;
  if (!me) return null;
  return me;
}

export async function logout(redirectTo: string = "/login") {
  const client = getApolloClient();
  const res: any = await client.mutate({
    mutation: gql`
      mutation Logout {
        logout {
          success
        }
      }
    `,
  });
  if (res?.data?.logout?.success) {
    Router.push(redirectTo);
  }
}
