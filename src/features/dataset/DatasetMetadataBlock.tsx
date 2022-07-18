import { gql } from "@apollo/client";
import Block from "components/Block";
import DescriptionList from "components/DescriptionList";
import { toMetadataFormValues } from "libs/dataset";
import {
  AccessmodFilesetRoleCode,
  AccessmodFilesetStatus,
  DatasetMetadataBlock_DatasetFragment,
} from "libs/graphql";
import { isTruthy } from "libs/types";
import { useTranslation } from "next-i18next";
import { useMemo } from "react";
import ClassLabelsGrid from "./ClassLabelsGrid";

type DatasetMetadataBlockProps = {
  dataset: DatasetMetadataBlock_DatasetFragment;
};

const DatasetMetadataBlock = ({ dataset }: DatasetMetadataBlockProps) => {
  const { t } = useTranslation();
  const metadata = useMemo(
    () => toMetadataFormValues(dataset.metadata),
    [dataset]
  );

  const items = [
    <DescriptionList.Item
      key="filename"
      label={t("Filename", { count: dataset.files.length })}
    >
      {dataset.files.map((f) => f.name).join(", ")}
    </DescriptionList.Item>,
    [
      AccessmodFilesetRoleCode.LandCover,
      AccessmodFilesetRoleCode.Stack,
    ].includes(dataset.role.code) && (
      <DescriptionList.Item key="labels" label={t("Labels")}>
        {metadata.labels?.length ? (
          <ClassLabelsGrid labels={metadata.labels} />
        ) : (
          "-"
        )}
      </DescriptionList.Item>
    ),
    dataset.role.code === AccessmodFilesetRoleCode.Boundaries && (
      <DescriptionList.Item key="area_column" label={t("Area's name column")}>
        {dataset.metadata.name_column ?? "-"}
      </DescriptionList.Item>
    ),

    dataset.role.code === AccessmodFilesetRoleCode.TransportNetwork && (
      <DescriptionList.Item key="category_column" label={t("Category column")}>
        {dataset.metadata.category_column}
      </DescriptionList.Item>
    ),
    dataset.metadata.category_column &&
      dataset.metadata.values?.[dataset.metadata.category_column] && (
        <DescriptionList.Item
          key="category_values"
          label={t("Category values")}
        >
          <span className="text-ellipsis">
            {dataset.metadata.values[dataset.metadata.category_column].join(
              ", "
            )}
          </span>
        </DescriptionList.Item>
      ),

    (isTruthy(metadata?.min) || isTruthy(metadata?.max)) && (
      <DescriptionList.Item key="range" label={t("Range")}>
        [{metadata.min ?? "-"}, {metadata.max ?? "-"}]
      </DescriptionList.Item>
    ),
    ["1p", "2p", "98p", "99p"].some((p) => p in metadata) && (
      <DescriptionList.Item key="percentiles" label={t("Percentiles")}>
        <table className="who" style={{ width: "fit-content" }}>
          <thead>
            <tr>
              <td>{t("Percentile")}</td>
              <td>{t("Value")}</td>
            </tr>
          </thead>
          <tbody>
            {["1p", "2p", "98p", "99p"].map((percentile) => (
              <tr key={percentile}>
                <td>{percentile}</td>
                <td>{percentile in metadata ? metadata[percentile] : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DescriptionList.Item>
    ),
    isTruthy(metadata.unique_values) && (
      <DescriptionList.Item key="unique_values" label={t("Unique values")}>
        [{metadata.unique_values.join(", ")}]
      </DescriptionList.Item>
    ),
  ].filter(Boolean);

  if (
    [
      AccessmodFilesetStatus.Validating,
      AccessmodFilesetStatus.Pending,
      AccessmodFilesetStatus.ToAcquire,
    ].includes(dataset.status)
  ) {
    return (
      <Block>
        <h3 className="mb-3">{t("Metadata")}</h3>
        <div className="text-sm italic text-gray-500">
          {t("The metadata of your dataset has not been extracted yet.")}
        </div>
      </Block>
    );
  }

  return (
    <Block>
      <h3 className="mb-3">{t("Metadata")}</h3>
      {items.length > 0 ? (
        <DescriptionList>{items}</DescriptionList>
      ) : (
        <div className="text-sm italic text-gray-500">
          {t("No metadata found.")}
        </div>
      )}
    </Block>
  );
};

DatasetMetadataBlock.fragments = {
  dataset: gql`
    fragment DatasetMetadataBlock_dataset on AccessmodFileset {
      metadata
      status
      files {
        name
      }
      role {
        code
      }
    }
  `,
};

export default DatasetMetadataBlock;
