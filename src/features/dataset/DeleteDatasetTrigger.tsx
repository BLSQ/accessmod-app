import { gql } from "@apollo/client";
import Button from "components/Button";
import useCacheKey from "hooks/useCacheKey";
import { useDeleteDatasetMutation } from "libs/graphql";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { ReactElement, useCallback } from "react";

type Props = {
  dataset: any;
  project: any;
  children?: ({ onClick }: { onClick: () => void }) => ReactElement;
  className?: string;
};

const DELETE_MUTATION = gql`
  mutation DeleteDataset($input: DeleteAccessmodFilesetInput!) {
    deleteAccessmodFileset(input: $input) {
      success
    }
  }
`;

const DeleteDatasetTrigger = ({
  project,
  dataset,
  children,
  className,
}: Props) => {
  const [deleteDataset] = useDeleteDatasetMutation();
  const { t } = useTranslation();
  const router = useRouter();
  const clearCache = useCacheKey(["projects", project.id]);

  const onDeleteClick = useCallback(async () => {
    if (
      window.confirm(
        t('Are you sure you want to delete the dataset "{{name}}"?', {
          name: dataset.name,
        })
      )
    ) {
      await deleteDataset({ variables: { input: { id: dataset.id } } });
      if (
        router.asPath.startsWith(
          `/projects/${encodeURIComponent(
            project.id
          )}/datasets/${encodeURIComponent(dataset.id)}`
        )
      )
        await router.push(
          `/projects/${encodeURIComponent(project.id)}/datasets`
        );
      clearCache();
    }
  }, [project, dataset, router, deleteDataset, t, clearCache]);

  if (!dataset.permissions.delete) {
    return null;
  } else if (children) {
    return children({ onClick: onDeleteClick });
  } else {
    return (
      <Button variant="white" className={className} onClick={onDeleteClick}>
        {t("Delete")}
      </Button>
    );
  }
};

DeleteDatasetTrigger.fragments = {
  project: gql`
    fragment DeleteDatasetTrigger_project on AccessmodProject {
      id
      name
    }
  `,
  dataset: gql`
    fragment DeleteDatasetTrigger_dataset on AccessmodFileset {
      id
      permissions {
        delete
      }
    }
  `,
};

export default DeleteDatasetTrigger;
