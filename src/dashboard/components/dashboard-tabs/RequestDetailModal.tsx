import Link from "next/link";
import { PropsWithChildren } from "react";
import { MessageSquare } from "lucide-react";

import { NSAuthUser } from "@/src/auth/types";
import { Button } from "@/components/ui/button";
import { routes } from "@/src/common/utils/constants";
import StatusChip from "@/src/common/components/StatusChip";
import GenericDialog from "@/src/common/components/GenericDialog";
import { getVariantByStatus } from "@/src/dashboard/utils/helpers";

type TRequestDetailModal = PropsWithChildren & {
  data: NSAuthUser.TRequest;
};
export default function RequestDetailModal({
  children,
  data,
}: TRequestDetailModal) {
  const isAccepted = data.status === "ACCEPTED";

  return (
    <GenericDialog
      title=""
      showFooter={isAccepted}
      handleSubmit={() => {}}
      keepContentPadding={false}
      dialogContentProps={{
        className: "sm:max-w-3xl",
      }}
      footerContent={
        isAccepted ? (
          // <Link href={`chat/${data?.lsp?.id}`}>
            <Button size="xs" endIcon={<MessageSquare size={16} />}>
              Message {data?.lsp?.firstName}
            </Button>
          // </Link>
        ) : null
      }
      content={
        <div className="px-4 space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto py-4">
          <div className="flex items-center gap-x-2">
            <b>Current Status:</b>
            <StatusChip
              variant={getVariantByStatus(data.status)}
              label={data.status?.toLowerCase()}
            />
          </div>
          <p>
            <b>Subject:</b> {data.subject}
          </p>
          <p>
            <b>Description:</b> {data.description}
          </p>
        </div>
      }
    >
      {children}
    </GenericDialog>
  );
}
