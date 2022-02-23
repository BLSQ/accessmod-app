import { gql } from "@apollo/client";
import { PlusIcon } from "@heroicons/react/solid";
import Button from "components/Button";
import SelectInput, { DefaultComponents } from "components/forms/SelectInput";
import useToggle from "hooks/useToggle";
import { getFilesetRoles } from "libs/dataset";
import {
  AccessmodFilesetFormat,
  AccessmodFilesetRoleCode,
  DatasetPicker_ProjectFragment,
  useDatasetPickerLazyQuery,
} from "libs/graphql";
import { i18n } from "next-i18next";
import { useCallback, useEffect, useMemo, useState } from "react";
import CreateDatasetDialog from "./CreateDatasetDialog";

type Props = {
  value: { [key: string]: any };
  project: DatasetPicker_ProjectFragment;
  roleCode: AccessmodFilesetRoleCode;
  disabled?: boolean;
  onChange: (value: any) => void;
  required?: boolean;
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

const CustomMenuList = ({ children, onCreate, ...props }: any) => {
  return (
    <DefaultComponents.MenuList {...props}>
      {children}
      <div className="text-sm mt-1 px-3 py-2 border-t border-gray-300">
        <Button
          size="sm"
          variant="secondary"
          onClick={onCreate}
          leadingIcon={<PlusIcon className="h-4" />}
        >
          Create a new dataset
        </Button>
      </div>
    </DefaultComponents.MenuList>
  );
};

const RECOMMENDED_OPTION = {
  id: null,
  get name() {return i18n!.t("Use recommended dataset")}
};

const DatasetPicker = (props: Props) => {
  const { value, onChange, disabled, required, project, roleCode } = props;
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

  // We add the `Recommended dataset` option in the list
  const options = useMemo(() => {
    return [RECOMMENDED_OPTION, ...(data?.filesets?.items ?? [])];
  }, [data]);

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
  }, [role]);

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
        value={value ?? RECOMMENDED_OPTION}
        defaultValue={RECOMMENDED_OPTION}
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
            <CustomMenuList onCreate={toggleCreateDialog} {...props} />
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
      ...CreateDatasetDialog_project
    }
    ${CreateDatasetDialog.fragments.project}
  `,
};

export default DatasetPicker;
