import { gql } from "@apollo/client";
import {
  CheckCircleIcon,
  PauseIcon,
  CloudIcon,
} from "@heroicons/react/outline";
import { ExclamationIcon } from "@heroicons/react/solid";
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
          label={t("This dataset is invalid: {{message}}", {
            message: dataset.metadata?.validation_error ?? t("Unknown error"),
          })}
        >
          <ExclamationIcon className="h-5 text-red-400" />
        </Tooltip>
      );
    case AccessmodFilesetStatus.Valid:
      return (
        <Tooltip label={t("Valid")}>
          <CheckCircleIcon className="h-5 text-teal-400" />
        </Tooltip>
      );
    case AccessmodFilesetStatus.ToAcquire:
      return (
        <Tooltip label={t("This dataset will be generated automatically.")}>
          <CloudIcon className="h-5 w-5 text-lochmara-100" />
        </Tooltip>
      );
    case AccessmodFilesetStatus.Pending:
      return (
        <Tooltip label={t("Pending")}>
          <PauseIcon className="h-5 text-lochmara-100" />
        </Tooltip>
      );
    case AccessmodFilesetStatus.Validating:
      return (
        <Tooltip label={t("Validating")}>
          <PauseIcon className="h-5 text-lochmara-100" />
        </Tooltip>
      );
    default:
      return null;
  }
};

DatasetStatusIcon.fragments = {
  dataset: gql`
    fragment DatasetStatusIcon_dataset on AccessmodFileset {
      status
      metadata
    }
  `,
};

export default DatasetStatusIcon;
