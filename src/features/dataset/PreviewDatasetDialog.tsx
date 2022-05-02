import { gql } from "@apollo/client";
import Button from "components/Button";
import Dialog from "components/Dialog";
import Spinner from "components/Spinner";
import { usePreviewDatasetDialogQuery } from "libs/graphql";
import { useTranslation } from "next-i18next";
import DatasetViewer from "./DatasetViewer";
import DownloadDatasetButton from "./DownloadDatasetButton";

type PreviewDatasetDialogProps = {
  dataset: any;
  project: any;
  open: boolean;
  onClose: () => void;
};

const QUERY = gql`
  query PreviewDatasetDialog($id: String!) {
    dataset: accessmodFileset(id: $id) {
      ...DatasetViewer_dataset
      ...DownloadDatasetButton_dataset
    }
  }
  ${DownloadDatasetButton.fragments.dataset}
  ${DatasetViewer.fragments.dataset}
`;

const PreviewDatasetDialog = (props: PreviewDatasetDialogProps) => {
  const { dataset, project, onClose, open } = props;
  const { t } = useTranslation();
  const { data, loading } = usePreviewDatasetDialogQuery({
    variables: { id: dataset.id },
  });
  return (
    <Dialog open={open} onClose={onClose} maxWidth="w-full">
      <Dialog.Title onClose={onClose}>{dataset.name}</Dialog.Title>
      <Dialog.Content>
        {loading && <Spinner className="w-full p-6" />}
        {data?.dataset && (
          <DatasetViewer dataset={data.dataset} project={project} />
        )}
      </Dialog.Content>
      <Dialog.Actions>
        <Button variant="white" onClick={onClose}>
          {t("Close")}
        </Button>
        {data?.dataset && (
          <DownloadDatasetButton dataset={data.dataset}>
            {t("Download")}
          </DownloadDatasetButton>
        )}
      </Dialog.Actions>
    </Dialog>
  );
};

PreviewDatasetDialog.fragments = {
  project: gql`
    fragment PreviewDatasetDialog_project on AccessmodProject {
      id
      ...DatasetViewer_project
    }
    ${DatasetViewer.fragments.project}
  `,
  dataset: gql`
    fragment PreviewDatasetDialog_dataset on AccessmodFileset {
      id
      name
    }
  `,
};

export default PreviewDatasetDialog;
