import { gql } from "@apollo/client";
import clsx from "clsx";
import Badge from "components/Badge";
import Spinner from "components/Spinner";
import { formatDatasetStatus } from "libs/dataset";
import {
  AccessmodFilesetStatus,
  DatasetStatusBadge_DatasetFragment,
  usePollDatasetStatusLazyQuery,
} from "libs/graphql";
import { useEffect } from "react";

type DatasetStatusBadgeProps = {
  dataset: DatasetStatusBadge_DatasetFragment;
};

const QUERY = gql`
  query PollDatasetStatus($id: String!) {
    dataset: accessmodFileset(id: $id) {
      id
      status
      metadata
    }
  }
`;

const DatasetStatusBadge = (props: DatasetStatusBadgeProps) => {
  const { dataset } = props;
  const [_, { startPolling, stopPolling }] = usePollDatasetStatusLazyQuery({
    pollInterval: 2500,
    variables: { id: dataset.id },
  });

  const className = clsx(
    dataset.status === AccessmodFilesetStatus.Invalid &&
      "bg-amber-300 text-white",
    dataset.status === AccessmodFilesetStatus.Pending &&
      "bg-lochmara-100 text-white",
    dataset.status === AccessmodFilesetStatus.Valid && "bg-teal-400 text-white",
    dataset.status === AccessmodFilesetStatus.Validating &&
      "bg-lochmara-100 text-white"
  );

  useEffect(() => {
    if (
      dataset.status === AccessmodFilesetStatus.Validating ||
      dataset.status === AccessmodFilesetStatus.Pending
    ) {
      startPolling(2500);
    }
    return () => {
      stopPolling();
    };
  }, [dataset.status, startPolling, stopPolling]);

  return (
    <Badge className={className} size="xs">
      {dataset.status === AccessmodFilesetStatus.Validating && (
        <Spinner size="xs" className="mr-1.5" />
      )}
      {formatDatasetStatus(dataset.status)}
    </Badge>
  );
};

DatasetStatusBadge.fragments = {
  dataset: gql`
    fragment DatasetStatusBadge_dataset on AccessmodFileset {
      id
      status
    }
  `,
};

export default DatasetStatusBadge;
