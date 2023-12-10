'use client';

import * as z from 'zod';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { forgetPasswordFormSchema } from '@/src/auth/utils/formSchemas';
import authAPI from '@/src/auth/authAPI';
import SpinnerButton from '@/src/common/components/SpinnerButton';
import { useToast } from '@/components/ui/use-toast';

const ForgetPasswordForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof forgetPasswordFormSchema>>({
    resolver: zodResolver(forgetPasswordFormSchema),
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof forgetPasswordFormSchema>) => {
    const { error, message } = await authAPI.forgetPassword(values.email);
    if (error) {
      toast({
        title: message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: message,
        variant: 'success',
      });
    }
  };

  return (
    <div className="px-2 md:px-0">
      <h1 className="text-center font-semibold text-4xl text-primary mb-4">
        Forget password?
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 md:min-w-[400px]"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    disabled={isSubmitting}
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SpinnerButton isSubmitting={isSubmitting} className="w-full" type="submit">
            Get password reset link
          </SpinnerButton>
        </form>
      </Form>
      <Link href="/">
        <Image
          alt=""
          className="mx-auto mt-4"
          src="/logo/header_logo.svg"
          width={120}
          height={50}
        />
      </Link>
    </div>
  );
};

export default ForgetPasswordForm;
