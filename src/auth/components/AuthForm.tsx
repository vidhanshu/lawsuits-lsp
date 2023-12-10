'use client';

import * as z from 'zod';

import Link from 'next/link';
import { HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  defaultSignInFormValues,
  defaultSignUpFormValues,
  signInFormSchema,
  signUpFormSchema,
} from '@/src/auth/utils/formSchemas';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import authAPI from '@/src/auth/authAPI';
import LogoWithName from '@/src/common/components/LogoWithName';
import SpinnerButton from '@/src/common/components/SpinnerButton';

interface IAuthFormProps extends HTMLAttributes<HTMLDivElement> {
  isSignInForm?: boolean;
}
export default function AuthForm({
  isSignInForm = false,
  className,
  ...props
}: IAuthFormProps) {
  const formSchema = isSignInForm ? signInFormSchema : signUpFormSchema;
  const defaultValues = isSignInForm
    ? defaultSignInFormValues
    : defaultSignUpFormValues;
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleLogin = async (values: z.infer<typeof formSchema>) => {
    const { error, message } = await authAPI.signIn(
      values.email,
      values.password
    );
    if (error) {
      toast({
        title: 'Something went wrong',
        description: message,
        variant: 'destructive',
      });

      return;
    }
    toast({
      title: message,
      variant: 'success',
    });
    router.push('/onboarding-form');
  };

  const handleSignup = async (values: z.infer<typeof formSchema>) => {
    const { error, message } = await authAPI.signUp(
      values.email,
      values.password
    );
    if (error) {
      toast({
        title: 'Something went wrong',
        description: message,
        variant: 'destructive',
      });

      return;
    }
    toast({
      title: 'Account created',
      description: 'Your account has been created successfully',
      variant: 'success',
    });
    router.push('/home');
  };

  const onSubmit = isSignInForm ? handleLogin : handleSignup;

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div
      className={cn('grid gap-6 md:min-w-[400px] px-2 md:px-0', className)}
      {...props}
    >
      <h1 className="text-center font-semibold text-4xl text-primary">
        {isSignInForm ? 'Sign in' : 'Sign up'}
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={isSubmitting}
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isSignInForm && (
              <span className="flex items-center gap-2 justify-end mt-4">
                <Link
                  href="/forget-password"
                  className="text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </span>
            )}
          </div>
          {!isSignInForm && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={isSubmitting}
                      placeholder="confirm password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <SpinnerButton isSubmitting={isSubmitting} className="w-full" type="submit">
            {isSignInForm ? 'Sign In' : 'Sign Up'}
          </SpinnerButton>

          {!isSignInForm ? (
            <span className="flex items-center gap-2 justify-center">
              Already have an account?{' '}
              <Link
                aria-disabled={isSubmitting}
                href="/sign-in"
                className="text-primary hover:underline"
              >
                Login
              </Link>
            </span>
          ) : (
            <span className="flex items-center gap-2 justify-center">
              Don&apos;t have an account yet?{' '}
              <Link href="/sign-up" className="text-primary hover:underline">
                Register
              </Link>
            </span>
          )}
        </form>
      </Form>
      <LogoWithName className="mx-auto" />
    </div>
  );
}
