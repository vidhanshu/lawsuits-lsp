"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  onboardingFormSchema,
  defaultOnboardingFormValues,
  onboardingFormWithAchivementNoSchema,
} from "@/src/onboarding/utils/formSchema";
import ProfileForm from "./ProfileForm";
import AuthAPI from "@/src/auth/authAPI";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { NSAuthUser } from "@/src/auth/types";
import { Switch } from "@/components/ui/switch";
import AchivementForm from "./AchivementsForm";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { routes } from "@/src/common/utils/constants";
import { Separator } from "@/components/ui/separator";
import Container from "@/src/common/components/Container";
import AdditionalDetailsForm from "./AdditionalDetailsForm";
import VerificationDetailsForm from "./VerificationDetails";
import useUserContext from "@/src/auth/contexts/userContext/useUserContext";

export default function OnboardingForm() {
  const router = useRouter();
  const { lsp, setLsp } = useUserContext();
  const [haveAchivement, setHaveAchivement] = useState(false);

  const formSchema = haveAchivement
    ? onboardingFormSchema
    : onboardingFormWithAchivementNoSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: defaultOnboardingFormValues,
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const {
      error,
      message,
      data: returnedPayload,
    } = await AuthAPI.UpdateLsp(lsp?.id!, values as any, lsp!);

    if (error) {
      toast({
        title: "Something went wrong",
        description: message,
        variant: "destructive",
      });
    } else {
      setLsp((prev) => ({
        ...prev,
        ...((returnedPayload || {}) as NSAuthUser.TUser),
      }));
      router.push(routes.HOME_ROUTE);
      toast({
        title: "Form submitted",
        description: message,
        variant: "success",
      });
    }
  }

  return (
    <Container className="py-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <ProfileForm form={form} />
          <Separator className="my-8" />
          <AdditionalDetailsForm form={form} />
          <Separator className="my-8" />
          <VerificationDetailsForm form={form} />

          <Separator className="my-8" />
          <div>
            <div className="flex items-center space-x-2">
              <Label
                className="text-lg font-semibold"
                htmlFor="achievement-mode"
              >
                Do you want to add any achievement?
              </Label>
              <Switch
                disabled={form.formState.isSubmitting}
                checked={haveAchivement}
                onCheckedChange={(e) => {
                  setHaveAchivement(e);
                }}
                id="achievement-mode"
              />
            </div>
          </div>
          <Separator className="my-8" />
          {haveAchivement && <AchivementForm form={form} />}
          <Button loading={form.formState.isSubmitting} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </Container>
  );
}
