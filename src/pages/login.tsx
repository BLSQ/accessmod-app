import { FormEvent, ReactElement, useState } from "react";
import Button from "components/Button";
import Input from "components/forms/Input";
import Field from "components/forms/Field";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import useForm from "hooks/useForm";

type FormInputs = {
  email?: string;
  password?: string;
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
  const [login, { data, loading }] = useMutation(LOGIN);
  const router = useRouter();
  const { formData, isValid, handleInputChange } = useForm<FormInputs>({
    initialState: {},
    validate: (values) => Boolean(values.email && values.password),
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = await login({ variables: { input: formData } });
    if (payload.data.login.success) {
      router.push(props.redirectTo ?? "/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md: w-full md:max-w-md">
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200 p-5">
          <form className="space-y-4" onSubmit={onSubmit}>
            <Field name="email" required>
              <Input
                type="text"
                required
                name="email"
                value={formData.email ?? ""}
                onChange={handleInputChange}
              />
            </Field>
            <Field name="password" required>
              <Input
                required
                type="password"
                name="password"
                value={formData.password ?? ""}
                onChange={handleInputChange}
              />
            </Field>

            {data?.login && !data?.login?.success && (
              <div className={"text-red-600"}>
                We were unable to log you in. Please verify your credentials.
              </div>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={!isValid || loading}
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
