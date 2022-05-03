import { gql } from "@apollo/client";
import { CheckCircleIcon, PauseIcon } from "@heroicons/react/outline";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import Tooltip from "components/Tooltip";
import {
  AccessmodFilesetStatus,
  DatasetStatusIcon_DatasetFragment,
} from "libs/graphql";
import { useTranslation } from "next-i18next";

const DatasetStatusIcon = ({
  dataset,
}: {
  dataset: DatasetStatusIcon_DatasetFragment;
}) => {
  const { t } = useTranslation();
  switch (dataset.status) {
    case AccessmodFilesetStatus.Invalid:
      return (
        <Tooltip
          label={t("This dataset is invalid. Please update its metadata.")}
        >
          <ExclamationCircleIcon className="h-4 text-amber-300" />
        </Tooltip>
      );
    case AccessmodFilesetStatus.Valid:
      return <CheckCircleIcon className="h-4 text-teal-400" />;
    case AccessmodFilesetStatus.Pending:
    case AccessmodFilesetStatus.Validating:
      return <PauseIcon className="h-4 text-lochmara-100" />;
  }
};

DatasetStatusIcon.fragments = {
  dataset: gql`
    fragment DatasetStatusIcon_dataset on AccessmodFileset {
      status
    }
  `,
};

export default DatasetStatusIcon;
