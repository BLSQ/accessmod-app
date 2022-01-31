import Router from "next/router"
import { getApolloClient } from "./apollo"
import { gql } from "@apollo/client"

export async function logout(redirectTo: string = "/login") {
  const client = getApolloClient()
  const res: any = await client.mutate({
    mutation: gql`
      mutation Logout {
        logout {
          success
        }
      }
    `,
  })
  if (res?.data?.logout?.success) {
    Router.push(redirectTo)
  }
}
