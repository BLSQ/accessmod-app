import { gql, useMutation } from "@apollo/client";
import Button from "components/Button";
import Checkbox from "components/forms/Checkbox";
import Field from "components/forms/Field";
import Spinner from "components/Spinner";
import useForm from "hooks/useForm";
import { displayAlert } from "libs/alert";
import { RequestAccessMutation } from "libs/graphql";
import { createGetServerSideProps } from "libs/page";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement } from "react";

type FormInputs = {
  email: string;
  firstName: string;
  lastName: string;
  acceptTos: boolean;
};

const SignupPage = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [requestAccess, { data }] = useMutation<RequestAccessMutation>(gql`
    mutation RequestAccess($input: RequestAccessmodAccessInput!) {
      requestAccessmodAccess(input: $input) {
        success
        errors
      }
    }
  `);

  const form = useForm<FormInputs>({
    initialState: {},
    validate: (values) => {
      const errors = {} as any;
      if (!values.email) {
        errors.email = t("Enter your email");
      }
      if (!values.firstName) {
        errors.password = t("Enter your first name");
      }
      if (!values.lastName) {
        errors.password = t("Enter your last name");
      }
      if (!values.acceptTos) {
        errors.acceptTos = t("You have to to accept the Terms of Service");
      }
      return errors;
    },
    onSubmit: async (values) => {
      const { data } = await requestAccess({
        variables: {
          input: {
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            acceptTos: values.acceptTos,
          },
        },
      });
      if (data?.requestAccessmodAccess?.success) {
        await router.push("/");
        displayAlert(
          t("Your request is going to be reviewed by the administrators.")
        );
      } else {
        displayAlert(t("We were unable to create an access request."), "error");
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
        <h2 className="text-center font-medium text-white">
          {t("Request an access")}
        </h2>
        <form className="space-y-4 px-4" onSubmit={form.handleSubmit}>
          <Field
            name="email"
            required
            type="email"
            labelColor="text-white"
            errorColor="text-white"
            label={t("Email")}
            disabled={form.isSubmitting}
            error={form.touched.email && form.errors.email}
            onChange={form.handleInputChange}
            placeholder="user@example.com"
          />
          <Field
            name="firstName"
            required
            label={t("First name")}
            labelColor="text-white"
            errorColor="text-white"
            disabled={form.isSubmitting}
            error={form.touched.firstName && form.errors.firstName}
            onChange={form.handleInputChange}
          />
          <Field
            name="lastName"
            required
            label={t("Last name")}
            labelColor="text-white"
            errorColor="text-white"
            disabled={form.isSubmitting}
            error={form.touched.lastName && form.errors.lastName}
            onChange={form.handleInputChange}
          />
          <Checkbox
            label={
              <span className="text-white">
                {t(
                  "Yes, I agree to the Terms of Service and the Privacy Policy"
                )}
              </span>
            }
            checked={form.formData.acceptTos}
            required
            className="text-lochmara-700"
            name="acceptTos"
            onChange={form.handleInputChange}
          />

          <div className="text-right">
            <Button type="submit" className="px-6" disabled={form.isSubmitting}>
              {form.isSubmitting && <Spinner className="mr-2" size="xs" />}
              {t("Request an account")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

SignupPage.getLayout = (page: ReactElement) => page;

export const getServerSideProps = createGetServerSideProps({
  requireAuth: false,
  getServerSideProps: (ctx) => {
    if (ctx.user) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }
  },
});

export default SignupPage;
