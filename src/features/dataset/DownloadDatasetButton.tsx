import { gql } from "@apollo/client";
import Button, { ButtonProps } from "components/Button";
import Spinner from "components/Spinner";
import { getFileDownloadUrl } from "libs/dataset";
import { downloadURL } from "libs/file";
import { DownloadDatasetButton_DatasetFragment } from "libs/graphql";
import { useTranslation } from "next-i18next";
import { ReactNode, useState } from "react";

type Props = {
  dataset: DownloadDatasetButton_DatasetFragment;
  children?: ReactNode;
} & ButtonProps;

const DownloadDatasetButton = ({ dataset, children, ...delegated }: Props) => {
  const { t } = useTranslation();
  const [isPreparing, setPreparing] = useState(false);
  const handleDownload = async () => {
    setPreparing(true);
    await Promise.allSettled(
      dataset.files.map(
        (file) =>
          new Promise<void>(async (resolve, reject) => {
            try {
              const fileDownloadUrl = await getFileDownloadUrl(file.id);
              await downloadURL(fileDownloadUrl, file.name);
              resolve();
            } catch (err) {
              reject(err);
            }
          })
      )
    );
    setPreparing(false);
  };

  return (
    <Button disabled={isPreparing} {...delegated} onClick={handleDownload}>
      <span className="flex items-center">
        {isPreparing && <Spinner className="mr-1" size="xs" />}
        <span>{children ?? t("Download")}</span>
      </span>
    </Button>
  );
};

DownloadDatasetButton.fragments = {
  dataset: gql`
    fragment DownloadDatasetButton_dataset on AccessmodFileset {
      id
      name
      files {
        id
        name
        mimeType
      }
    }
  `,
};

export default DownloadDatasetButton;
