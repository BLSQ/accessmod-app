import Button from "components/Button";
import { NextPageWithLayout } from "libs/types";

const DebugErrorPage: NextPageWithLayout = () => {
  const throwError = (_: any) => {
    throw new Error("Test error");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Button onClick={throwError}>Throw Error</Button>
    </div>
  );
};

DebugErrorPage.getLayout = (page) => page;

export default DebugErrorPage;
