import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Dropzone from "components/Dropzone";
import { filesize } from "filesize";
import { ACCEPTED_MIMETYPES, getRasterMetadata } from "libs/dataset";
import { AccessmodFilesetFormat, AccessmodFilesetRole } from "libs/graphql";
import { useTranslation } from "next-i18next";
import { useCallback, useEffect, useState } from "react";

type DatasetFileInputProps = {
  onChange: (files: File[]) => void;
  className?: string;
  label?: string;
  files?: File[];
  disabled?: boolean;
  role: Pick<AccessmodFilesetRole, "format" | "code">;
};

const DatasetFileInput = (props: DatasetFileInputProps) => {
  const { t } = useTranslation();
  const {
    onChange,
    role,
    className,
    disabled = false,
    label = t("Select your file(s)"),
  } = props;
  const [error, setError] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState<null | File[]>(null);

  const validateFile = useCallback(
    async (file: File) => {
      if (role.format === AccessmodFilesetFormat.Raster) {
        const metadata = await getRasterMetadata(file);
        if (metadata.modelType !== 1) {
          throw new Error(
            "Invalid CRS mode. Only projected files are supported."
          );
        }
      }
    },
    [role]
  );

  useEffect(() => {
    setSelectedFiles(props.files ?? null);
  }, [props.files]);

  useEffect(() => {
    setError(null);
    if (!selectedFiles?.length) return;
    validateFile(selectedFiles[0]).then(
      () => {
        onChange(selectedFiles);
      },
      (err) => setError(err?.message)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFiles, validateFile]);

  let children = null;

  if (error) {
    children = (
      <div className="flex items-center">
        <XCircleIcon className="mr-2 h-4 text-amber-400" />
        <span className="text-amber-500">{error}</span>
      </div>
    );
  } else if (selectedFiles && selectedFiles?.length > 0) {
    children = (
      <div className="flex items-center">
        <CheckCircleIcon className="mr-2 h-4 text-teal-400" />
        {selectedFiles.map((f) => `${f.name} (${filesize(f.size)})`).join(", ")}
      </div>
    );
  }
  return (
    <Dropzone
      disabled={disabled || !role}
      className={className}
      maxFiles={1}
      label={label}
      onChange={setSelectedFiles}
      accept={role?.format ? ACCEPTED_MIMETYPES[role.format] : undefined}
    >
      {children}
    </Dropzone>
  );
};

export default DatasetFileInput;
