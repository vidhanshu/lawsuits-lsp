"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  dialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";

type TGenericDialogProps = {
  variant?: "success" | "error" | "warning" | "info" | "confirm";
  title: string;
  content?: React.ReactNode;
  children?: React.ReactNode;
  description?: string;
  handleSubmit: () => void;
  buttonTitle?: string;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  dialogContentProps?: React.ComponentProps<typeof DialogContent>;
  showCancelBtn?: boolean;
  showSubmitBtn?: boolean;
  showFooter?: boolean;
  keepContentPadding?: boolean;
  footerContent?: React.ReactNode;
};
const getButtonPropsByVariant = (
  variant: TGenericDialogProps["variant"],
): ButtonProps => {
  switch (variant) {
    case "confirm":
      return {
        variant: "default",
      };
    case "error":
      return {
        variant: "destructive",
      };
    case "info":
      return {
        className: "bg-blue-400 hover:bg-blue-500 text-white",
      };
    case "warning":
      return {
        className: "bg-yellow-500 hover:bg-yellow-600 text-white",
      };
    case "success":
      return {
        className: "bg-green-500 hover:bg-green-600 text-white",
      };
    default:
      return {
        variant: "default",
      };
  }
};
const GenericDialog = ({
  title,
  open,
  setOpen,
  content,
  children,
  description,
  handleSubmit,
  footerContent = null,
  showFooter = true,
  variant = "confirm",
  showCancelBtn = true,
  showSubmitBtn = true,
  keepContentPadding = true,
  buttonTitle = "Ok, I'm sure",
  dialogContentProps: {
    className: dcName,
    ...restOtherDialogContentProps
  } = {},
}: TGenericDialogProps) => {
  const [loading, setLoading] = useState(false);
  console.log(footerContent);

  const onSubmit = () => {
    try {
      setLoading(true);
      handleSubmit();
    } catch (error) {
      // handle error here
    } finally {
      setLoading(false);
      dialogClose();
    }
  };

  const { className, ...otherButtonProps } = getButtonPropsByVariant(variant);

  return (
    <Dialog {...(open && setOpen ? { open, onOpenChange: setOpen } : {})}>
      {children ? <DialogTrigger asChild>{children}</DialogTrigger> : null}
      <DialogContent
        {...restOtherDialogContentProps}
        className={cn(
          "max-w-sm sm:max-w-xl max-h-[calc(100vh-40px)] px-0",
          dcName,
        )}
      >
        <DialogHeader className="px-4">
          <DialogTitle>{title}</DialogTitle>
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : null}
        </DialogHeader>
        <div className={cn(keepContentPadding && "px-4")}>{content}</div>
        {showFooter && (
          <>
            <Separator />
            <DialogFooter className="px-4">
              {!!footerContent ? (
                footerContent
              ) : (
                <>
                  {showCancelBtn && (
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Cancel
                      </Button>
                    </DialogClose>
                  )}
                  {showSubmitBtn && (
                    <Button
                      loading={loading}
                      onClick={onSubmit}
                      type="button"
                      className={cn("mb-4 md:mb-0", className)}
                      {...otherButtonProps}
                    >
                      {buttonTitle}
                    </Button>
                  )}
                </>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GenericDialog;
