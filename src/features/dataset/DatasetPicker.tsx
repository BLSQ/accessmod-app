import { gql } from "@apollo/client";
import { PlusIcon } from "@heroicons/react/solid";
import Button from "components/Button";
import SelectInput, { DefaultComponents } from "components/forms/SelectInput";
import useToggle from "hooks/useToggle";
import { getFilesetRoles } from "libs/dataset";
import {
  AccessmodFilesetFormat,
  AccessmodFilesetRoleCode,
  AccessmodProjectAuthorizedActions,
  DatasetPicker_ProjectFragment,
  useDatasetPickerLazyQuery,
} from "libs/graphql";
import { i18n, useTranslation } from "next-i18next";
import { useCallback, useEffect, useMemo, useState } from "react";
import CreateDatasetDialog from "./DatasetFormDialog";

type Props = {
  value: { [key: string]: any };
  project: DatasetPicker_ProjectFragment;
  roleCode: AccessmodFilesetRoleCode;
  disabled?: boolean;
  onChange: (value: any) => void;
  required?: boolean;
  recommendedOption?: boolean;
};

const QUERY = gql`
  query DatasetPicker(
    $projectId: String!
    $page: Int = 1
    $perPage: Int = 15
    $roleId: String
  ) {
    filesets: accessmodFilesets(
      projectId: $projectId
      page: $page
      perPage: $perPage
      roleId: $roleId
    ) {
      items {
        id
        name
        role {
          id
          name
          format
        }
        createdAt
        updatedAt
      }
      totalItems
    }
  }
`;

const CustomMenuList = ({ children, onCreate, project, ...props }: any) => {
  const { t } = useTranslation();
  return (
    <DefaultComponents.MenuList {...props}>
      {children}
      {project.authorizedActions.includes(
        AccessmodProjectAuthorizedActions.CreateFileset
      ) && (
        <div className="mt-1 border-t border-gray-300 px-3 py-2 text-sm">
          <Button
            size="sm"
            variant="secondary"
            onClick={onCreate}
            leadingIcon={<PlusIcon className="h-4" />}
          >
            {t("Create a new dataset")}
          </Button>
        </div>
      )}
    </DefaultComponents.MenuList>
  );
};

const RECOMMENDED_OPTION = {
  id: null,
  get name() {
    return i18n!.t("Use recommended dataset");
  },
};

const DatasetPicker = (props: Props) => {
  const {
    value,
    onChange,
    disabled,
    required,
    project,
    roleCode,
    recommendedOption = false,
  } = props;
  const [roles, setRoles] = useState<
    {
      id: string;
      code: AccessmodFilesetRoleCode;
      name: string;
      format: AccessmodFilesetFormat;
    }[]
  >([]);
  const [isCreateDialogOpen, { toggle: toggleCreateDialog }] = useToggle(false);
  const [fetch, { data, loading }] = useDatasetPickerLazyQuery({
    variables: { projectId: project.id },
    fetchPolicy: "cache-and-network",
  });

  const role = useMemo(
    () => roles.find((r) => r.code === roleCode),
    [roles, roleCode]
  );

  // Load more items
  const onMenuScrollToBottom = useCallback(() => {
    if (data && data.filesets.items.length < data.filesets.totalItems && role) {
      fetch({
        variables: {
          projectId: project.id,
          perPage: data.filesets.items.length + 15,
          roleId: role.id,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // Get all fileset roles on mount
  useEffect(() => {
    getFilesetRoles().then((roles) => setRoles(roles));
  }, []);

  // We add the `Recommended dataset` option in the list if activated
  const options = useMemo(() => {
    const base = recommendedOption ? [RECOMMENDED_OPTION] : [];
    return [...base, ...(data?.filesets?.items ?? [])];
  }, [data, recommendedOption]);

  const onCreateDialogClose = useCallback((reason?: string, fileset?: any) => {
    toggleCreateDialog();
    if (reason === "submit" && fileset) {
      onChange(fileset);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMenuOpen = useCallback(() => {
    if (!role) return;
    fetch({
      variables: {
        projectId: project.id,
        roleId: role.id,
      },
    });
  }, [role, fetch, project]);

  const defaultValue = recommendedOption ? RECOMMENDED_OPTION : null;

  return (
    <>
      <CreateDatasetDialog
        open={isCreateDialogOpen}
        onClose={onCreateDialogClose}
        project={project}
        role={role}
      />
      <SelectInput
        options={options}
        value={value ?? defaultValue}
        defaultValue={defaultValue}
        onMenuOpen={onMenuOpen}
        disabled={
          disabled ||
          !role /* Do not allow edit if the roles are not yet fetched */ ||
          isCreateDialogOpen // Do not allow edit if user is currently creating a dataset
        }
        onChange={onChange}
        required={required}
        isLoading={loading}
        onMenuScrollToBottom={onMenuScrollToBottom}
        labelKey="name"
        valueKey="id"
        components={{
          MenuList: (props) => (
            <CustomMenuList
              project={project}
              onCreate={toggleCreateDialog}
              {...props}
            />
          ),
        }}
      />
    </>
  );
};

DatasetPicker.fragments = {
  project: gql`
    fragment DatasetPicker_project on AccessmodProject {
      id
      authorizedActions
      ...DatasetFormDialog_project
    }
    ${CreateDatasetDialog.fragments.project}
  `,
};

export default DatasetPicker;
