import { Button } from '@/components/ui/button';
import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const SpinnerButton = ({
  isSubmitting = false,
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isSubmitting?: boolean;
}) => (
  <Button {...rest} disabled={isSubmitting}>
    {isSubmitting ? (
      <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
    ) : (
      children
    )}
  </Button>);

export default SpinnerButton;
