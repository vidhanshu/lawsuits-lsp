import React from "react";
import { FileUp } from "lucide-react";
import { useDropzone, DropzoneProps } from "react-dropzone";

import { cn } from "@/lib/utils";

type TFileUploadFieldProps = {
  file: File;
  label?: string;
  subLabel?: string;
  sectionProps?: React.HTMLAttributes<HTMLDivElement>;
} & DropzoneProps;
export default function FileUploadField({
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
        "group cursor-pointer hover:border-gray-400 active:border-blue-500 transition border-dashed border-2 rounded-md border-gray-300",
        isDragActive && "border-blue-500",
        isDragReject && "border-red-500",
        className,
      )}
    >
      <div {...getRootProps()} className="p-4 h-[120px]">
        <input {...getInputProps()} />
        <div className="flex flex-col items-center h-full">
          <FileUp
            className={cn(
              "group-hover:text-gray-600 text-gray-500 w-8 h-8",
              isDragActive && "text-blue-500",
              isDragReject && "text-red-500",
            )}
          />
          <h1 className="group-hover:text-gray-600 text-gray-500 text-sm mt-4">
            {isDragActive && !isDragReject ? (
              <h1 className="text-blue-500 font-bold h-[40px]">Drop Here!</h1>
            ) : isDragReject ? (
              <h1 className="text-red-500 font-bold h-[40px]">
                File type not accepted, sorry!
              </h1>
            ) : file ? (
              file.name
            ) : (
              <div className="text-center h-[40px]">
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
