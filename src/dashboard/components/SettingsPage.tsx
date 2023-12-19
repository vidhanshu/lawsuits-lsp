"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogOut } from "lucide-react";

import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { passwordResetSchema } from "../utils/formSchemas";
import { Separator } from "@/components/ui/separator";
import AuthAPI from "@/src/auth/authAPI";
import { toast } from "@/components/ui/use-toast";
import GenericDialog from "./../../common/components/GenericDialog";
import LspAPI from "./lspAPI";

const SettingsPage = () => {
  const form = useForm<z.infer<typeof passwordResetSchema>>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const handleSignOut = async () => {
    const { message, error } = await AuthAPI.signOut();
    if (error) {
      toast({
        title: "Something went wrong",
        description: message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: message,
        variant: "success",
      });
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-gray-800">Password Reset</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})}>
          <div className="space-y-4 gap-x-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Current Pasword</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={isSubmitting}
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>New Pasword</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={isSubmitting}
                      placeholder="New Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Current Pasword</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={isSubmitting}
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button>Update password</Button>
          </div>
        </form>
      </Form>

      <Separator className="my-4" />
      <h1 className="text-xl font-bold mb-4 text-gray-800">Sign out</h1>
      <GenericDialog
        variant="error"
        title="Are you sure?"
        description="Do you really want to sign out?"
        handleSubmit={handleSignOut}
      >
        <Button endIcon={<LogOut size={16} />} variant="destructive">
          Sign out
        </Button>
      </GenericDialog>
      <div>
        <Separator className="my-8" />
        <h1>Remove below stuffs it is just for testing</h1>
        <Button 
          // onClick={async () => await LspAPI.setLSPS()}
        >
          Add dummy LSP data
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
