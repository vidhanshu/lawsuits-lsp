import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ACCEPTED_FILE_TYPES } from "@/src/common/utils/constants";
import FileUploadField from "@/src/common/components/FileUploadField";

type TVerificationDetailsProps = {
  form: UseFormReturn<any>;
};
export default function VerificationDetailsForm({
  form,
}: TVerificationDetailsProps) {
  return (
    <section>
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-800">
          Verification details{" "}
          <span className="font-medium text-muted-foreground text-sm">
            (These details are required to verify lsp)
          </span>
        </h1>
      </div>
      <div className="col-span-2 space-y-4">
        <FormField
          control={form.control}
          name="additionalDetails.enrollmentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bar council id / enrollment Id</FormLabel>
              <FormControl>
                <Input placeholder="example: MH12345/20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="additionalDetails.proof"
          render={({ field: { onChange }, ...field }) => {
            const file = form.watch("additionalDetails.proof");

            return (
              <FormItem>
                <FormLabel>
                  Bar council/Degree/ any relevent certificate
                </FormLabel>
                <FormControl>
                  <FileUploadField
                    file={file}
                    disabled={form.formState.isSubmitting}
                    accept={ACCEPTED_FILE_TYPES}
                    subLabel="only doc, docx or pdf supported"
                    onDrop={(files) => {
                      if (files.length) {
                        onChange(files[0]);
                      }
                    }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>
    </section>
  );
}
