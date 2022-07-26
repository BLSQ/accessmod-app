import { gql } from "@apollo/client";
import Button from "components/Button";
import Field from "components/forms/Field";
import useForm from "hooks/useForm";
import { useSetPasswordMutation } from "libs/graphql";
import { createGetServerSideProps } from "libs/page";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";

type FormInputs = {
  password1: string;
  password2: string;
};

const MUTATION = gql`
  mutation setPassword($input: SetPasswordInput!) {
    setPassword(input: $input) {
      success
      error
    }
  }
`;

const SetPasswordPage = () => {
  const [isDone, setDone] = useState(false);
  const router = useRouter();
  const [setPassword] = useSetPasswordMutation();
  const { t } = useTranslation();
  const form = useForm<FormInputs>({
    initialState: {},
    validate: (values) => {
      const errors = {} as any;
      if (!values.password1) {
        errors.password1 = t("Enter your new password");
      }
      if (!values.password2 || values.password1 !== values.password2) {
        errors.password2 = t("Passwords must be equal");
      }
      return errors;
    },
    onSubmit: async (values) => {
      await setPassword({
        variables: {
          input: {
            password1: values.password1,
            password2: values.password2,
            token: router.query.token as string,
            uidb64: router.query.uidb64 as string,
          },
        },
      });
      setDone(false);
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
          {t("Set your password")}
        </h2>
        {isDone ? (
          <div className="space-y-2 text-white">
            <p>{t("Your new password has been set.")}</p>
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
            <form className="space-y-4 px-4" onSubmit={form.handleSubmit}>
              <Field
                name="password1"
                type="password"
                label={t("Password")}
                required
                labelColor="text-white"
                errorColor="text-white"
                autoComplete="new-password"
                placeholder="********************"
                value={form.formData.password1}
                onChange={form.handleInputChange}
                disabled={form.isSubmitting}
                error={form.touched.password1 && form.errors.password1}
              />
              <Field
                name="password2"
                type="password"
                label={t("Confirm Password")}
                labelColor="text-white"
                errorColor="text-white"
                required
                autoComplete="new-password"
                placeholder="********************"
                value={form.formData.password2}
                onChange={form.handleInputChange}
                disabled={form.isSubmitting}
                error={form.touched.password2 && form.errors.password2}
              />
              {form.submitError && (
                <p className={"mt-2 text-sm text-red-600"}>
                  {form.submitError}
                </p>
              )}
              <Button
                disabled={form.isSubmitting}
                type="submit"
                className="w-full"
              >
                {t("Set password")}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

SetPasswordPage.getLayout = (page: ReactElement) => page;

export const getServerSideProps = createGetServerSideProps({
  requireAuth: false,
});

export default SetPasswordPage;
