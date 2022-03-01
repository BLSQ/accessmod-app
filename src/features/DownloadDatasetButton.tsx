import { gql } from "@apollo/client";
import Button, { ButtonProps } from "components/Button";
import Spinner from "components/Spinner";
import { getFileDownloadUrl } from "libs/dataset";
import { downloadURL } from "libs/file";
import { DownloadDatasetButton_DatasetFragment } from "libs/graphql";
import { useTranslation } from "next-i18next";
import { useState } from "react";

type Props = {
  dataset: DownloadDatasetButton_DatasetFragment;
} & ButtonProps;

const DownloadDatasetButton = ({ dataset, ...delegated }: Props) => {
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
      {isPreparing ? (
        <span className="flex items-center">
          <Spinner className="mr-1" size="xs" />
          <span>{t("Preparing download")}</span>
        </span>
      ) : (
        t("Download {{count}} files", { count: dataset.files.length })
      )}
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
