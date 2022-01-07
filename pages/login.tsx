import { FormEvent, useState } from "react"
import type { NextPage } from "next"
import Button from "components/Button"
import Input from "components/Input"
import { gql, useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import useForm from "hooks/useForm"

type FormInputs = {
  email?: string
  password?: string
}

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
`

interface Props {
  redirectTo?: string
}

const Login: NextPage<Props> = (props) => {
  const [login, { data, loading }] = useMutation(LOGIN)
  const router = useRouter()
  const { formData, isValid, handleInputChange } = useForm<FormInputs>({
    initialState: {},
    validate: (values) => Boolean(values.email && values.password),
  })

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const payload = await login({ variables: { input: formData } })
    if (payload.data.login.success) {
      router.push(props.redirectTo ?? "/")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md: w-full md:max-w-md">
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200 p-5">
          <form className="space-y-4" onSubmit={onSubmit}>
            <Input
              label="Email"
              type="text"
              required
              name="email"
              value={formData.email ?? ""}
              onChange={handleInputChange}
            />
            <Input
              required
              type="password"
              label="Password"
              name="password"
              value={formData.password ?? ""}
              onChange={handleInputChange}
            />

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
  )
}

export default Login
