import { gql } from "@apollo/client";
import { getApolloClient } from "libs/apollo";
import { FetchCountriesQuery } from "./graphql";

export async function fetchCountries() {
  const client = getApolloClient();
  const { data } = await client.query<FetchCountriesQuery>({
    query: gql`
      query FetchCountries {
        countries {
          code
          alpha3
          name
          flag
          defaultCRS
          whoRegion {
            code
            name
          }
        }
      }
    `,
  });

  if (!data) {
    throw new Error("Cannot fetch countries");
  }

  return data.countries;
}

export const REGIONS = ["AMR", "AFR", "EUR", "EMR", "WPR", "SEAR"];
