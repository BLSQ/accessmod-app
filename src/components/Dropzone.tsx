import { ReactElement, ReactNode, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import type { FileError, FileRejection } from "react-dropzone";
import { UploadIcon } from "@heroicons/react/solid";
import clsx from "clsx";

type Props = {
  className?: string;
  label?: ReactNode;
  accept?: string;
  children?: ReactElement;
  onChange: <T extends File>(
    acceptedFiles: T[],
    rejectedFiles: FileRejection[]
  ) => void;
  validator?: <T extends File>(file: T) => FileError | FileError[] | null;
};

const Dropzone = (props: Props) => {
  const { className, label, validator, accept, onChange, children } = props;
  const [isMounted, setMounted] = useState(false);
  const { getInputProps, getRootProps, acceptedFiles, fileRejections } =
    useDropzone({ validator, accept });

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
        "font flex w-full items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 px-5 py-5 text-sm text-gray-500 shadow-sm hover:border-gray-400",
        className
      )}
      {...getRootProps()}
    >
      <input type="hidden" {...getInputProps()} />
      {children ?? (
        <div className="flex items-center gap-1">
          <UploadIcon className="h-4 w-4" />
          <span>{label}</span>
        </div>
      )}
    </div>
  );
};

export default Dropzone;
