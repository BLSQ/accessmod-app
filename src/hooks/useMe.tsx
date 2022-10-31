import { createContext, ReactNode, useContext } from "react";
import { getUser } from "../libs/auth";

export const MeCtx = createContext<null | Awaited<ReturnType<typeof getUser>>>(
  null
);

export const MeProvider = (props: { me: any; children: ReactNode }) => {
  return <MeCtx.Provider value={props.me}>{props.children}</MeCtx.Provider>;
};

export default function useMe() {
  const me = useContext(MeCtx);

  if (!me) {
    throw new Error("useMe must be under a MeProvider with a value");
  }
  return me;
}
