import { NextPageWithLayout } from "libs/types";
import Image from "next/image";

const NotFoundPage: NextPageWithLayout = () => {
  return (
    <div className="flex h-screen w-screen flex-1 items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <Image
          priority
          alt="who logo"
          src="/images/WHO-logo-watermark-blue.png"
          layout="fixed"
          height="111"
          width="363"
        />
        <h1 className="font-medium text-picton-blue-700">Page not found</h1>
      </div>
    </div>
  );
};

NotFoundPage.getLayout = (page) => page;

export default NotFoundPage;
