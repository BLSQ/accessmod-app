import { useTranslation } from "next-i18next";
import Link from "next/link";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-lochmara">
      <div className="mx-auto flex max-w-6xl items-baseline justify-between py-4 text-center text-sm text-white sm:px-4 sm:text-left md:px-8">
        <div className="flex items-baseline">
          <span className="mr-2 block sm:inline">&copy; 2022 WHO</span>{" "}
          <Link href="/">
            <a className="block sm:inline">{t("Contact Support")}</a>
          </Link>
        </div>
        <div className="text-xs">{process.env.NEXT_PUBLIC_RELEASE}</div>
      </div>
    </footer>
  );
};

export default Footer;
