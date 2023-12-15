import React from "react";
import { FileUp } from "lucide-react";
import { useDropzone, DropzoneProps } from "react-dropzone";

import { cn } from "@/lib/utils";

type TFileUploadFieldProps = {
  file: File | null;
  label?: string;
  subLabel?: string;
  sectionProps?: React.HTMLAttributes<HTMLDivElement>;
} & DropzoneProps;
export default function DropZone({
  file,
  label = "Drag 'n' drop file here, or click to select",
  subLabel = "Only .jpg, .jpeg, .png accepted",
  sectionProps: { className, ...restSectionProps } = {},
  ...props
}: TFileUploadFieldProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone(props);

  return (
    <section
      {...restSectionProps}
      className={cn(
        "group cursor-pointer hover:border-gray-600 h-full w-full transition border-dashed border-2 rounded-md border-gray-500",
        className,
        isDragActive && "border-blue-500",
        isDragReject && "border-red-500",
      )}
    >
      <div {...getRootProps()} className="h-full w-full">
        <input {...getInputProps()} />
        <div className="flex border flex-row gap-2 h-full w-full justify-center items-center">
          <FileUp
            className={cn(
              "group-hover:text-gray-600 text-gray-500 w-8 h-8",
              isDragActive && "text-blue-500",
              isDragReject && "text-red-500",
            )}
          />
          <h1 className="group-hover:text-gray-600 text-gray-500 text-sm">
            {isDragActive && !isDragReject ? (
              <h1 className="text-blue-500 font-bold">Drop Here!</h1>
            ) : isDragReject ? (
              <h1 className="text-red-500 font-bold">
                File type not accepted, sorry!
              </h1>
            ) : file ? (
              file.name
            ) : (
              <div className="text-center">
                <h1 className="text-gray-500">{label}</h1>
                <em className="text-gray-500 text-xs">{subLabel}</em>
              </div>
            )}
          </h1>
        </div>
      </div>
    </section>
  );
}
