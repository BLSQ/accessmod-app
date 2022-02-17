import { ReactElement, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import type { FileError, FileRejection } from "react-dropzone";
import { UploadIcon } from "@heroicons/react/solid";
import clsx from "clsx";

type Props = {
  className?: string;
  label?: string | ReactElement;
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
  }, [acceptedFiles, fileRejections]);

  return (
    <div
      className={clsx(
        "border w-full rounded-md bg-gray-50 px-5 py-5 text-sm flex items-center justify-center border-gray-300 hover:border-gray-400 shadow-sm border-dashed font text-gray-500",
        className
      )}
      {...getRootProps()}
    >
      <input type="hidden" {...getInputProps()} />
      {children ?? (
        <div className="flex gap-1 items-center">
          <UploadIcon className="h-4 w-4" />
          <span>{label}</span>
        </div>
      )}
    </div>
  );
};

export default Dropzone;
