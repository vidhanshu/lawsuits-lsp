import { motion } from "framer-motion";
import { UseFormReturn } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";
import { ACCEPTED_FILE_TYPES } from "@/src/common/utils/constants";
import FileUploadField from "@/src/common/components/FileUploadField";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";

type TAchivementFormProps = {
  form: UseFormReturn<any>;
};
export default function AchivementForm({ form }: TAchivementFormProps) {
  return (
    <motion.section
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
    >
      <h1 className="text-xl font-bold mb-4 text-gray-800">Achivements</h1>
      <div>
        <FormField
          control={form.control}
          name="additionalDetails.achivements"
          render={() => {
            const proof = form.watch("additionalDetails.achivements.proof");

            return (
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  name="additionalDetails.achivements.description"
                  control={form.control}
                  render={({ field: descriptionField }) => (
                    <FormItem>
                      <Textarea
                        className="min-h-[120px]"
                        placeholder="Enter your professional summary"
                        {...descriptionField}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="additionalDetails.achivements.proof"
                  control={form.control}
                  render={({ field: { onChange }, ...field }) => (
                    <FormItem>
                      <FileUploadField
                        file={proof}
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            );
          }}
        />
      </div>
    </motion.section>
  );
}
