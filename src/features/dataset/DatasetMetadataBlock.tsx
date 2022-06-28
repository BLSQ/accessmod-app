import { gql } from "@apollo/client";
import Block from "components/Block";
import DescriptionList from "components/DescriptionList";
import { toMetadataFormValues } from "libs/dataset";
import {
  AccessmodFilesetRoleCode,
  AccessmodFilesetStatus,
  DatasetMetadataBlock_DatasetFragment,
} from "libs/graphql";
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
    [
      AccessmodFilesetRoleCode.LandCover,
      AccessmodFilesetRoleCode.Stack,
    ].includes(dataset.role.code) && (
      <DescriptionList.Item
        key="labels"
        label={t("Labels")}
        className="col-span-2"
      >
        <div className="w-1/2">
          {metadata.labels?.length ? (
            <ClassLabelsGrid labels={metadata.labels} />
          ) : (
            "-"
          )}
        </div>
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
        <DescriptionList.Item label={t("Category values")}>
          <span className="text-ellipsis">
            {dataset.metadata.values[dataset.metadata.category_column].join(
              ", "
            )}
          </span>
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
      role {
        code
      }
    }
  `,
};

export default DatasetMetadataBlock;
