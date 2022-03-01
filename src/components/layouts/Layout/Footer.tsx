import { useTranslation } from "next-i18next";
import Link from "next/link";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-lochmara">
      <div className=" text-white">
        <div className="py-4 text-sm text-center sm:text-left max-w-5xl mx-auto sm:px-4 md:px-8">
          <span className="block sm:inline mr-2">&copy; 2022 WHO</span>{" "}
          <Link href="/">
            <a className="block sm:inline">{t("Contact Support")}</a>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
