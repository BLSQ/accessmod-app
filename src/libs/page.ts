import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { AuthenticatedUser, getUser } from "./auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { addApolloState, CustomApolloClient, getApolloClient } from "./apollo";

interface CreateGetServerSideProps {
  i18n?: string[];
  requireAuth?: boolean;
  getServerSideProps?: (
    ctx: GetServerSidePropsContext,
    client: CustomApolloClient
  ) => Promise<GetServerSidePropsResult<any> | void>;
}

interface ServerSideProps {
  user: AuthenticatedUser | null;
  [key: string]: any;
}

export function createGetServerSideProps(options: CreateGetServerSideProps) {
  const {
    i18n = ["common"],
    requireAuth = false,
    getServerSideProps,
  } = options;

  return async function (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<ServerSideProps>> {
    const res = {
      props: {
        user: await getUser(ctx),
        ...(await serverSideTranslations(ctx.locale ?? "en", i18n)),
      },
    };

    if (requireAuth && !res.props.user) {
      return {
        ...res,
        redirect: {
          destination: `/login?returnTo=${encodeURIComponent(ctx.resolvedUrl)}`,
          permanent: false,
        },
      };
    }

    if (getServerSideProps) {
      const client = getApolloClient(ctx.req);
      const nextRes = await getServerSideProps(ctx, client);
      return {
        ...res,
        ...nextRes,
        props: {
          ...res.props,
          ...addApolloState(client).props,
          ...(nextRes && "props" in nextRes ? nextRes.props : {}),
        },
      };
    }

    return res;
  };
}
