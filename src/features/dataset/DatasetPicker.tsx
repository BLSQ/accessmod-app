import { gql } from "@apollo/client";
import {
  CheckCircleIcon,
  PauseIcon,
  SelectorIcon,
} from "@heroicons/react/outline";
import { ExclamationCircleIcon, PlusIcon } from "@heroicons/react/solid";
import Button from "components/Button";
import Combobox from "components/forms/Combobox";
import Tooltip from "components/Tooltip";
import { useFilesetRoles } from "libs/dataset";
import {
  AccessmodFilesetRoleCode,
  AccessmodFilesetStatus,
  AccessmodProjectAuthorizedActions,
  DatasetPicker_ProjectFragment,
  useDatasetPickerLazyQuery,
} from "libs/graphql";
import { i18n, useTranslation } from "next-i18next";
import { useCallback, useEffect, useMemo, useState } from "react";
import CreateDatasetDialog from "./DatasetFormDialog";

type Props = {
  dataset?: any;
  project: DatasetPicker_ProjectFragment;
  roleCode: AccessmodFilesetRoleCode;
  disabled?: boolean;
  onChange: (value: any) => void;
  required?: boolean;
  placeholder?: string;
  recommendedOption?: boolean;
};

const RECOMMENDED_OPTION = {
  id: null,
  get name() {
    return i18n!.t("Use recommended dataset");
  },
};

const DatasetStatusIcon = ({ dataset }: { dataset: any }) => {
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
      return <PauseIcon className="h-4 text-blue-400" />;
  }

  return null;
};

const DatasetPicker = (props: Props) => {
  const { t } = useTranslation();
  const {
    project,
    placeholder = t("Select a dataset"),
    roleCode,
    dataset,
    onChange,
    required,
  } = props;
  const [query, setQuery] = useState("");
  const [isDialogOpen, showCreationDialog] = useState(false);
  const { roles } = useFilesetRoles();
  const [fetch, { data, loading }] = useDatasetPickerLazyQuery({
    variables: { projectId: project.id },
    fetchPolicy: "cache-and-network",
  });

  const role = useMemo(
    () => roles?.find((r) => r.code === roleCode),
    [roles, roleCode]
  );

  useEffect(() => {
    if (role) {
      fetch({
        variables: {
          projectId: project.id,
          page: 1,
          term: query,
          roleId: role.id,
        },
      });
    }
  }, [fetch, role, project, query]);

  const onCreateDialogClose = useCallback((reason?: string, fileset?: any) => {
    showCreationDialog(false);
    if (reason === "submit" && fileset) {
      onChange(fileset);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // We add the `Recommended dataset` option in the list if activated
  const options = useMemo(() => {
    return [...(data?.filesets?.items ?? [])];
  }, [data]);

  return (
    <>
      <CreateDatasetDialog
        open={isDialogOpen}
        onClose={onCreateDialogClose}
        project={project}
        role={role}
      />

      <Combobox
        loading={loading}
        value={dataset}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        renderIcon={({ value }) => (
          <div className="flex items-center gap-0.5">
            {value && <DatasetStatusIcon dataset={value} />}
            <SelectorIcon className="h-4" />
          </div>
        )}
        displayValue={(value) => value?.name}
        onInputChange={(event) => setQuery(event.target.value)}
      >
        {options.map((option) => (
          <Combobox.CheckOption
            key={option.id}
            value={option}
            forceSelected={option.id === dataset?.id}
          >
            <div className="flex w-full items-center justify-between">
              <span>{option.name}</span>
              <DatasetStatusIcon dataset={option} />
            </div>
          </Combobox.CheckOption>
        ))}

        {project.authorizedActions.includes(
          AccessmodProjectAuthorizedActions.CreateFileset
        ) && (
          <div className="mt-1 border-t border-gray-300 px-3 py-2 text-sm">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => showCreationDialog(true)}
              leadingIcon={<PlusIcon className="h-4" />}
            >
              {t("Create a new dataset")}
            </Button>
          </div>
        )}
      </Combobox>
    </>
  );
};

DatasetPicker.fragments = {
  dataset: gql`
    fragment DatasetPicker_dataset on AccessmodFileset {
      id
      name
      role {
        id
        name
        format
      }
      createdAt
      updatedAt
      status
    }
  `,
  project: gql`
    fragment DatasetPicker_project on AccessmodProject {
      id
      authorizedActions
      ...DatasetFormDialog_project
    }
    ${CreateDatasetDialog.fragments.project}
  `,
};

const QUERY = gql`
  query DatasetPicker(
    $projectId: String!
    $page: Int = 1
    $perPage: Int = 15
    $roleId: String
    $term: String
  ) {
    filesets: accessmodFilesets(
      projectId: $projectId
      page: $page
      term: $term
      perPage: $perPage
      roleId: $roleId
    ) {
      items {
        ...DatasetPicker_dataset
      }
      totalItems
    }
  }
  ${DatasetPicker.fragments.dataset}
`;

export default DatasetPicker;
