import { gql } from "@apollo/client";
import {
  ArrowUpTrayIcon,
  CloudIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Button from "components/Button";
import Toggle from "components/Toggle";
import Combobox from "components/forms/Combobox";
import useDatasetWatcher from "hooks/useDatasetWatcher";
import {
  createDataset,
  getDatasetDefaultMetadata,
  useFilesetRoles,
} from "libs/dataset";
import {
  AccessmodFilesetRoleCode,
  DatasetPicker_DatasetFragment,
  DatasetPicker_ProjectFragment,
  useDatasetPickerLazyQuery,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DatasetDialog } from "./DatasetDialog";
import CreateDatasetDialog from "./DatasetFormDialog";
import DatasetStatusIcon from "./DatasetStatusIcon";

type Props = {
  dataset?: DatasetPicker_DatasetFragment | null;
  project: DatasetPicker_ProjectFragment;
  roleCode: AccessmodFilesetRoleCode;
  disabled?: boolean;
  onChange: (value: any) => void;
  required?: boolean;
  placeholder?: string;
  multiple?: boolean;
  creatable?: boolean;
};

const DatasetPicker = (props: Props) => {
  const { t } = useTranslation();
  const {
    project,
    placeholder = t("Select a dataset"),
    roleCode,
    dataset,
    onChange,
    disabled = false,
    multiple = false,
    required = false,
    creatable = true,
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

  useDatasetWatcher(dataset, onChange);

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
  }, [fetch, role, project, query, dataset]);

  const onCreateDialogClose = useCallback((reason?: string, fileset?: any) => {
    showCreationDialog(false);
    if (reason === "submit" && fileset) {
      onChange(fileset);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options = useMemo(() => {
    const allOptions = [...(data?.filesets?.items ?? [])];
    if (dataset && !allOptions.find((x) => x.id === dataset.id)) {
      allOptions.splice(0, 0, dataset);
    }
    return allOptions;
  }, [data, dataset]);

  const canCreate = useMemo(
    () => project.permissions.createFileset && creatable,
    [creatable, project.permissions]
  );

  const onAcquireClick = useCallback(
    async (close: Function) => {
      if (!role) return;
      const dataset = await createDataset({
        automatic: true,
        project,
        role,
        metadata: getDatasetDefaultMetadata(role.code),
      });
      onChange(dataset);
      close();
    },
    [onChange, project, role]
  );

  const enableAcquire = useMemo(
    () =>
      role &&
      [
        AccessmodFilesetRoleCode.Dem,
        AccessmodFilesetRoleCode.HealthFacilities,
        AccessmodFilesetRoleCode.TransportNetwork,
        AccessmodFilesetRoleCode.Water,
        AccessmodFilesetRoleCode.LandCover,
        AccessmodFilesetRoleCode.Boundaries,
        AccessmodFilesetRoleCode.Population,
      ].includes(role.code),
    [role]
  );

  return (
    <>
      <CreateDatasetDialog
        open={isDialogOpen}
        onClose={onCreateDialogClose}
        project={project}
        role={role}
      />

      <Combobox
        disabled={disabled}
        withPortal
        loading={loading}
        multiple={multiple}
        value={dataset}
        onInputChange={(event) => setQuery(event.target.value)}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        footer={({ close }) =>
          canCreate && (
            <div className="mt-1 flex gap-2 border-t border-gray-300 px-3 py-2 text-sm">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => showCreationDialog(true)}
                leadingIcon={<ArrowUpTrayIcon className="h-4" />}
              >
                {t("Upload a dataset")}
              </Button>
              {enableAcquire && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onAcquireClick(close)}
                  leadingIcon={<CloudIcon className="h-4 w-4" />}
                >
                  {t("Automatically Acquire")}
                </Button>
              )}
            </div>
          )
        }
        renderIcon={({ value }) =>
          value && (
            <Toggle>
              {({ isToggled, toggle }) => (
                <>
                  <button
                    className="group flex items-center "
                    onClick={(e) => {
                      e.preventDefault();
                      toggle();
                    }}
                  >
                    <PencilIcon className="hidden h-5 text-gray-400 group-hover:block" />
                    <div className="flex items-center group-hover:hidden">
                      <DatasetStatusIcon dataset={value} />
                    </div>
                  </button>
                  <DatasetDialog
                    dataset={value}
                    onClose={toggle}
                    open={isToggled}
                  />
                </>
              )}
            </Toggle>
          )
        }
        displayValue={(value) => value?.name}
      >
        <div className={clsx("relative")}>
          {options.length === 0 && (
            <p className="p-2 text-center text-xs italic text-gray-500">
              {t("There is no result")}
            </p>
          )}
          <div className="h-full overflow-auto">
            {options.map((option) => (
              <Combobox.CheckOption
                key={option.id}
                value={option}
                forceSelected={option.id === dataset?.id}
              >
                <div className="flex items-center justify-between">
                  <div className="truncate">
                    <span title={option.name}>{option.name}</span>
                  </div>
                  <DatasetStatusIcon dataset={option} />
                </div>
              </Combobox.CheckOption>
            ))}
          </div>
        </div>
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
        code
      }
      metadata
      createdAt
      updatedAt
      status
      ...DatasetDialog_dataset
      ...DatasetStatusIcon_dataset
    }
    ${DatasetDialog.fragments.dataset}
    ${DatasetStatusIcon.fragments.dataset}
  `,
  project: gql`
    fragment DatasetPicker_project on AccessmodProject {
      id
      permissions {
        createFileset
      }
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
      mode: USER_INPUT
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
