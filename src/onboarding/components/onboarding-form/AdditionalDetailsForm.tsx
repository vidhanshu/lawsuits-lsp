import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type TAdditionalDetailsFormProps = {
  form: UseFormReturn<any>;
};
export default function AdditionalDetailsForm({
  form,
}: TAdditionalDetailsFormProps) {
  const isSubmitting = form.formState.isSubmitting;

  return (
    <section>
      <h1 className="text-xl font-bold mb-4 text-gray-800">
        Additional Details
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="additionalDetails.experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience(in yrs.)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  max="100"
                  min="0"
                  placeholder="Your experience"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="additionalDetails.specialities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specialities(Comma seperated)</FormLabel>
              <FormControl>
                <Input placeholder="Enter your specialities" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="additionalDetails.languages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Languages(Comma seperated)</FormLabel>
              <FormControl>
                <Input placeholder="Enter your languages" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="additionalDetails.fees"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fees/hr</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  placeholder="Enter your fees/hr"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-2">
          <FormField
            control={form.control}
            name="additionalDetails.summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professional Summary</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your professional summary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </section>
  );
}
