import { ReactElement } from "react";

type Props = {
  children: ReactElement;
};

const PageHeader = (props: Props) => {
  return <header className="pb-10">{props.children}</header>;
};

export default PageHeader;
