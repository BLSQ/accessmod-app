import { gql } from "@apollo/client";
import Button from "components/Button";
import Field from "components/forms/Field";
import useForm from "hooks/useForm";
import { useLoginMutation } from "libs/graphql";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement } from "react";

type FormInputs = {
  email: string;
  password: string;
};

const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      success
      me {
        id
        email
      }
    }
  }
`;

interface Props {
  redirectTo?: string;
}

const Login = (props: Props) => {
  const [login, { data }] = useLoginMutation();
  const router = useRouter();
  const { t } = useTranslation();
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
        router.push(props.redirectTo ?? "/");
      }
    },
  });

  return (
    <div className="min-h-screen bg-lochmara flex flex-col justify-center sm:py-12">
      <div className="p-5 md:p-10 mx-auto w-full md:max-w-md space-y-4">
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
        <h2 className="text-white font-medium text-center">AccessMod</h2>
        <p className="text-white text-center">Description</p>
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
          <div className="flex justify-between items-center">
            <a href="" className="text-xs text-gray-100 hover:underline">
              {t("Forgot your password ?")}
            </a>
            <Button type="submit" className="px-6" disabled={form.isSubmitting}>
              {t("Login")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

Login.getLayout = (page: ReactElement) => page;

export default Login;
