import Image from "next/image";
import { Pencil } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DUMMY_AVATAR_IMG } from "@/src/auth/utils/constants";
import { ROLES } from "@/src/onboarding/utils/constants";

type TProfileFormProps = {
  form: UseFormReturn<any>;
};
export default function ProfileForm({ form }: TProfileFormProps) {
  return (
    <section>
      <h1 className="text-xl font-bold mb-4 text-gray-800">Personal details</h1>
      <FormField
        name="profilePic"
        control={form.control}
        render={({ field: { onChange }, ...fields }) => {
          const profilePic = form.watch("profilePic");

          return (
            <FormItem>
              <div className="group w-[80px] h-[80px] relative rounded-full overflow-hidden cursor-pointer">
                <FormLabel>
                  <Image
                    fill
                    quality={60}
                    sizes="(max-width: 640px) 100vw, 640px"
                    alt="profile_image"
                    className="rounded-full col-span-3 object-cover"
                    src={
                      profilePic
                        ? URL.createObjectURL(profilePic)
                        : DUMMY_AVATAR_IMG
                    }
                  />
                  <div className="transition-colors group-hover:bg-black/40 w-full h-full rounded-full absolute flex justify-center items-center">
                    <Pencil className="w-5 h-5 hidden group-hover:block text-white" />
                  </div>
                </FormLabel>
              </div>
              <FormControl>
                <Input
                  accept="image/*"
                  className="hidden"
                  type="file"
                  onChange={(e) => {
                    if (e.target.files) {
                      onChange(e.target.files[0]);
                    }
                  }}
                  {...fields}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <div className="grid grid-cols-2 gap-4 mt-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your state" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Enter your city" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="profession"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profession</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="focus:-visible:ring-none">
                    <SelectValue placeholder="Select your profession" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ROLES.map(({ value, label }, idx) => (
                    <SelectItem key={idx} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </section>
  );
}
