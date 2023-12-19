"use client";

import { NSAuthUser } from "@/src/auth/types";
import { toast } from "@/components/ui/use-toast";
import DashboardSkeleton from "./DashboardSkeleton";
import useAsync from "@/src/common/custom-hooks/useAsync";
import { REQUSTS_TABS } from "@/src/dashboard/utils/constants";
import RenderTabContent from "./dashboard-tabs/RenderTabContent";
import useUserContext from "@/src/auth/contexts/userContext/useUserContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LspAPI from "./lspAPI";

export default function DashboardPage() {
  const { lsp } = useUserContext();
  const { data, setData, loading } = useAsync<NSAuthUser.TRequest[]>({
    async asyncCallback() {
      if (!lsp?.id) return;
      const { data } = await LspAPI.getAllRequestsByUser(lsp?.id!);
      return data.sort((a: NSAuthUser.TRequest, b: NSAuthUser.TRequest) => {
        if (a.status > b.status) {
          return 1;
        }
        if (a.status < b.status) {
          return -1;
        }
        return 0;
      });
    },
    dependency: [lsp],
  });

  const handleCancelReq = async (id: string) => {
    const { error, message } = await LspAPI.cancelPendingRequest(id);
    if (error) {
      toast({
        title: "Something went wrong",
        description: message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Request cancelled",
        description: message,
        variant: "success",
      });

      if (!data) {
        return;
      }
      setData(
        data.map((item) =>
          item.id === id ? { ...item, status: "REJECTED" } : item
        )
      );
    }
  };

  const handleDeleteReq = async (id: string) => {
    const { error, message } = await LspAPI.deleteCancelledReq(id);
    if (error) {
      toast({
        title: "Something went wrong",
        description: message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Request deleted",
        description: message,
        variant: "success",
      });
      if (!data) {
        return;
      }
      setData(data.filter((item) => item.id !== id));
    }
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div>
      <Tabs defaultValue="ALL">
        <div className="max-w-full overflow-y-auto sticky top-[53px] z-10 bg-white">
          <TabsList className="bg-white">
            {REQUSTS_TABS.map((item, idx) => (
              <TabsTrigger
                key={idx}
                className="px-8 py-2 border-b-[2px] data-[state=active]:border-blue-500 data-[state=active]:shadow-none  rounded-none"
                value={item.value}
              >
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {REQUSTS_TABS.map((item, idx) => (
          <TabsContent value={item.value} key={idx}>
            <RenderTabContent
              handleDeleteReq={handleDeleteReq}
              handleCancelReq={handleCancelReq}
              data={data || []}
              status={item.status as NSAuthUser.TRequest["status"] | "ALL"}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
