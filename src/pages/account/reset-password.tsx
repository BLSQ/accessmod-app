import { gql } from "@apollo/client";
import Button from "components/Button";
import Field from "components/forms/Field";
import useForm from "hooks/useForm";
import { useResetPasswordMutation } from "libs/graphql";
import { createGetServerSideProps } from "libs/page";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { ReactElement, useState } from "react";

type FormInputs = {
  email: string;
};

const MUTATION = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      success
    }
  }
`;

const ResetPasswordPage = () => {
  const [resetPassword] = useResetPasswordMutation();
  const [isDone, setDone] = useState(false);
  const { t } = useTranslation();
  const form = useForm<FormInputs>({
    initialState: {},
    validate: (values) => {
      const errors = {} as any;
      if (!values.email) {
        errors.email = t("Enter your email");
      }
      return errors;
    },
    onSubmit: async (values) => {
      const payload = await resetPassword({
        variables: {
          input: {
            email: values.email,
          },
        },
      });
      setDone(payload?.data?.resetPassword?.success ?? false);
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
        <h2 className="text-center font-medium text-white">
          {t("Reset your password")}
        </h2>
        {isDone ? (
          <div className="space-y-2 text-white">
            <p>
              {t(
                "We’ve emailed you instructions for setting your password, if an account exists with the email you entered. You should receive them shortly."
              )}
            </p>
            <p>
              {t(
                "If you don’t receive an email, please make sure you’ve entered the address you registered with, and check your spam folder."
              )}
            </p>
            <div className="pt-4">
              <Link href="/login">
                <a>
                  <Button className="w-full" type="button">
                    {t("Go to login page")}
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <p className="text-center text-white">
              {t(
                "Forgotten your password? Enter your email address below, and we’ll email instructions for setting a new one."
              )}
            </p>
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

              <div className="text-right">
                <Button
                  type="submit"
                  className="px-6"
                  disabled={form.isSubmitting}
                >
                  {t("Reset password")}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

ResetPasswordPage.getLayout = (page: ReactElement) => page;

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

export default ResetPasswordPage;
