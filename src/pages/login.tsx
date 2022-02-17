import { FormEvent, ReactElement, useState } from "react";
import Button from "components/Button";
import Input from "components/forms/Input";
import Field from "components/forms/Field";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import useForm from "hooks/useForm";
import { useLoginMutation } from "libs/graphql";

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
  const form = useForm<FormInputs>({
    initialState: {},
    validate: (values) => {
      const errors = {} as any;
      if (!values.email) {
        errors.email = "Enter your email";
      }
      if (!values.password) {
        errors.password = "Enter your password";
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
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md: w-full md:max-w-md">
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200 p-5">
          <form className="space-y-4" onSubmit={form.handleSubmit}>
            <Field
              name="email"
              required
              type="text"
              label="Email"
              disabled={form.isSubmitting}
              error={form.touched.email && form.errors.email}
              onChange={form.handleInputChange}
            />
            <Field
              name="password"
              required
              type="password"
              label="Password"
              disabled={form.isSubmitting}
              error={form.touched.password && form.errors.password}
              onChange={form.handleInputChange}
            />

            {data?.login && !data?.login?.success && (
              <div className={"text-red-600"}>
                We were unable to log you in. Please verify your credentials.
              </div>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={form.isSubmitting}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

Login.getLayout = (page: ReactElement) => page;

export default Login;
