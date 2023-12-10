import React from 'react';
import AuthForm from '@/src/auth/components/AuthForm';

const SignInPage = () => {
  return (
    <main className="flex justify-center items-center h-screen">
      <AuthForm isSignInForm />
    </main>
  );
};

export default SignInPage;
