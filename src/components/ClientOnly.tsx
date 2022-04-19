import { useState, useEffect } from "react";

type ClientOnlyProps = {
  children: JSX.Element;
};

const ClientOnly = (props: ClientOnlyProps) => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return null;
};

export default ClientOnly;
