import { gql } from "@apollo/client";
import SimpleSelect, { SimpleSelectProps } from "components/forms/SimpleSelect";
import {
  PermissionMode,
  ProjectPermissionPicker_ProjectFragment,
} from "libs/graphql";
import { formatPermissionMode } from "libs/team";
import { useTranslation } from "next-i18next";
import { ChangeEvent, MouseEvent, useCallback, useRef } from "react";

type ProjectPermissionsPickerProps = {
  onChange: (value: PermissionMode) => void;
  project: ProjectPermissionPicker_ProjectFragment;
  permission?: any;
} & Omit<SimpleSelectProps, "onChange">;

const ProjectPermissionPicker = (props: ProjectPermissionsPickerProps) => {
  const { t } = useTranslation();
  const {
    onChange,
    project,
    permission,
    placeholder = t("Select a permission"),
    ...delegated
  } = props;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      onChange(event.target.value as PermissionMode);
    },
    [onChange]
  );

  return (
    <SimpleSelect
      {...delegated}
      onChange={handleChange}
      placeholder={placeholder}
    >
      <option
        disabled={project.permissions.some(
          (perm) =>
            perm.mode === PermissionMode.Owner && perm.id !== permission?.id
        )}
        value={PermissionMode.Owner}
      >
        {formatPermissionMode(PermissionMode.Owner)}
      </option>
      <option value={PermissionMode.Editor}>
        {formatPermissionMode(PermissionMode.Editor)}
      </option>
      <option value={PermissionMode.Viewer}>
        {formatPermissionMode(PermissionMode.Viewer)}
      </option>
    </SimpleSelect>
  );
};

ProjectPermissionPicker.fragments = {
  project: gql`
    fragment ProjectPermissionPicker_project on AccessmodProject {
      permissions {
        mode
        id
      }
    }
  `,
  permission: gql`
    fragment ProjectPermissionPicker_permission on AccessmodProjectPermission {
      id
      mode
    }
  `,
};

export default ProjectPermissionPicker;
