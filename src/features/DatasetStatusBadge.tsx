import { gql } from "@apollo/client";
import clsx from "clsx";
import Badge from "components/Badge";
import { formatDatasetStatus } from "libs/dataset";
import {
  AccessmodFilesetStatus,
  DatasetStatusBadge_DatasetFragment,
} from "libs/graphql";

type DatasetStatusBadgeProps = {
  dataset: DatasetStatusBadge_DatasetFragment;
};

const DatasetStatusBadge = (props: DatasetStatusBadgeProps) => {
  const { dataset } = props;
  const className = clsx(
    dataset.status === AccessmodFilesetStatus.Invalid &&
      "bg-red-400 text-white",
    dataset.status === AccessmodFilesetStatus.Pending &&
      "bg-lochmara-100 text-white",
    dataset.status === AccessmodFilesetStatus.Valid &&
      "bg-emerald-500 text-white",
    dataset.status === AccessmodFilesetStatus.Validating &&
      "bg-purple-300 text-white"
  );
  return (
    <Badge className={className} size="xs">
      {formatDatasetStatus(dataset.status)}
    </Badge>
  );
};

DatasetStatusBadge.fragments = {
  dataset: gql`
    fragment DatasetStatusBadge_dataset on AccessmodFileset {
      status
    }
  `,
};

export default DatasetStatusBadge;
