import { ReactElement, useEffect } from "react";
import { logout } from "libs/auth";
import { getApolloClient } from "libs/apollo";

const Logout = () => {
  useEffect(() => {
    logout();
    const client = getApolloClient();
    client.resetStore();
  }, []);

  return null;
};

Logout.getLayout = (page: ReactElement) => page;

export default Logout;
