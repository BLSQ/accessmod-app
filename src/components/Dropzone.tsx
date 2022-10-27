import {
  ExclamationTriangleIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useTranslation } from "next-i18next";
import { ReactNode, useEffect, useState } from "react";
import type { Accept, FileError, FileRejection } from "react-dropzone";
import { useDropzone } from "react-dropzone";

export type DropzoneProps = {
  className?: string;
  label?: ReactNode;
  help?: ReactNode;
  accept?: Accept;
  disabled?: boolean;
  children?: ReactNode;
  maxFiles?: number;
  onChange: <T extends File>(
    acceptedFiles: T[],
    rejectedFiles: FileRejection[]
  ) => void;
  validator?: <T extends File>(file: T) => FileError | FileError[] | null;
};

const Dropzone = (props: DropzoneProps) => {
  const {
    className,
    help,
    label,
    validator,
    disabled,
    accept,
    maxFiles = 0,
    onChange,
    children,
  } = props;
  const { t } = useTranslation();
  const [isMounted, setMounted] = useState(false);
  const { getInputProps, getRootProps, acceptedFiles, fileRejections } =
    useDropzone({
      validator,
      accept,
      maxFiles,
      disabled,
      useFsAccessApi: false,
      multiple: maxFiles !== 1,
    });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      onChange(acceptedFiles, fileRejections);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptedFiles, fileRejections]);

  return (
    <div
      className={clsx(
        "font flex w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 px-5 py-5 text-sm text-gray-500 shadow-sm hover:border-gray-500",
        className
      )}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-2">
        {(!fileRejections.length && children) ?? (
          <>
            <div className="flex items-center gap-1">
              <ArrowUpTrayIcon className="h-4 w-4" />
              <div>{label}</div>
            </div>
            {help && <div className="italic text-gray-600">{help}</div>}
          </>
        )}
        {fileRejections?.length > 0 && (
          <div className="flex items-center">
            <ExclamationTriangleIcon className="mr-1 h-4 text-amber-400" />
            <span className="font-semibold">
              {t("{{files}} is not a valid file", {
                count: fileRejections.length,
                files: fileRejections
                  .map((rejection) => rejection.file.name)
                  .join(", "),
              })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
