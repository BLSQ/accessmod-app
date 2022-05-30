import { gql } from "@apollo/client";
import Button from "components/Button";
import Field from "components/forms/Field";
import Spinner from "components/Spinner";
import useForm from "hooks/useForm";
import { getApolloClient } from "libs/apollo";
import { useLoginMutation } from "libs/graphql";
import { createGetServerSideProps } from "libs/page";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";

type FormInputs = {
  email: string;
  password: string;
};

const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      success
    }
  }
`;

interface Props {
  next?: string;
}

const Login = (props: Props) => {
  const [login, { data }] = useLoginMutation();
  const router = useRouter();
  const { t } = useTranslation();
  useEffect(() => {
    getApolloClient().clearStore();
  }, []);
  const form = useForm<FormInputs>({
    initialState: {},
    validate: (values) => {
      const errors = {} as any;
      if (!values.email) {
        errors.email = t("Enter your email");
      }
      if (!values.password) {
        errors.password = t("Enter your password");
      }
      return errors;
    },
    onSubmit: async (values) => {
      const payload = await login({
        variables: {
          input: {
            email: values.email,
            password: values.password,
          },
        },
      });
      if (payload?.data?.login?.success) {
        await router.push(props.next ?? "/");
      }
    },
  });

  return (
    <div className="flex min-h-screen flex-col justify-center bg-lochmara sm:py-12">
      <div className="mx-auto w-full space-y-4 p-5 md:max-w-md md:p-10">
        <div className="text-center">
          <Image
            priority
            alt="who logo"
            src="/images/WHO-logo-watermark-white.png"
            layout="fixed"
            height="111"
            width="363"
          />
        </div>
        <h2 className="text-center font-medium text-white">AccessMod</h2>
        <p className="text-center text-white">Description</p>
        <form className="space-y-4 px-4" onSubmit={form.handleSubmit}>
          <Field
            name="email"
            required
            type="text"
            labelColor="text-white"
            errorColor="text-white"
            label={t("Email")}
            disabled={form.isSubmitting}
            error={form.touched.email && form.errors.email}
            onChange={form.handleInputChange}
            placeholder="user@example.com"
          />
          <Field
            name="password"
            required
            type="password"
            label={t("Password")}
            labelColor="text-white"
            errorColor="text-white"
            disabled={form.isSubmitting}
            error={form.touched.password && form.errors.password}
            onChange={form.handleInputChange}
            placeholder="*************"
          />

          {data?.login && !data?.login?.success && (
            <div className={"text-red-600"}>
              {t(
                "We were unable to log you in. Please verify your credentials."
              )}
            </div>
          )}
          <div className="flex items-center justify-between">
            <Link href="/reset-password">
              <a className="text-xs text-gray-100 hover:underline">
                {t("Forgot your password ?")}
              </a>
            </Link>
            <Button type="submit" className="px-6" disabled={form.isSubmitting}>
              {form.isSubmitting && <Spinner className="mr-2" size="xs" />}
              {t("Login")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

Login.getLayout = (page: ReactElement) => page;

export const getServerSideProps = createGetServerSideProps({
  requireAuth: false,
  getServerSideProps: (ctx) => {
    if (ctx.user) {
      return {
        redirect: {
          permanent: false,
          destination: `${ctx.query.next ?? "/"}`,
        },
      };
    }
  },
});

export default Login;
