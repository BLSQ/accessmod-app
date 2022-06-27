import { gql, useQuery } from "@apollo/client";
import DatasetPicker from "features/dataset/DatasetPicker";
import {
  AccessmodFilesetStatus,
  DatasetPicker_DatasetFragment,
  UseDatasetWatcherQuery,
} from "libs/graphql";
import _ from "lodash";
import { useEffect, useState } from "react";

const useDatasetWatcher = (
  dataset: { id: string } | null | undefined,
  onChange: (value: DatasetPicker_DatasetFragment) => void,
  duration: number = 2000
) => {
  const [current, setCurrent] = useState<any>(null);
  const { data, startPolling, stopPolling } = useQuery<UseDatasetWatcherQuery>(
    gql`
      query useDatasetWatcher($id: String!) {
        dataset: accessmodFileset(id: $id) {
          status
          ...DatasetPicker_dataset
        }
      }
      ${DatasetPicker.fragments.dataset}
    `,
    { variables: { id: dataset?.id }, skip: !dataset?.id }
  );

  useEffect(() => {
    if (
      dataset &&
      (!current ||
        ![
          AccessmodFilesetStatus.Valid,
          AccessmodFilesetStatus.Invalid,
        ].includes(current.status))
    ) {
      startPolling(duration);
    }
    return () => stopPolling();
  }, [dataset, current, startPolling, stopPolling, duration]);

  useEffect(() => {
    if (!data?.dataset) {
      return;
    }

    if (current && !_.isEqual(current, data.dataset)) {
      onChange(data.dataset);
    }

    setCurrent(data.dataset);
  }, [data, onChange, current]);
};

export default useDatasetWatcher;
