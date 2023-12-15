import { cn } from "@/lib/utils";

type TStatus = "primary" | "destructive" | "success" | "warning";

export default function StatusChip({
  label,
  variant,
}: {
  label: string;
  variant: TStatus;
}) {
  return (
    <div
      className={cn(
        getColorClassByVariant(variant),
        "font-medium w-fit rounded-md text-white text-[10px] py-[2px] h-fit px-2 flex items-center justify-center",
      )}
    >
      {label}
    </div>
  );
}

const getColorClassByVariant = (status: TStatus) => {
  switch (status) {
    case "primary":
      return "bg-blue-500";
    case "destructive":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "warning":
      return "bg-yellow-500";
    default:
      return "bg-blue-500";
  }
};
