"use client";

import { PlusIcon } from "lucide-react";
import { useQueryState } from "nuqs";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { useGetTasks } from "../api/use-get-tasks";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export const TaskViewSwitcher = () => {
  const [view, setView] = useQueryState("task-view", {
    defaultValue: "table",
  });

  const workspaceId = useWorkspaceId();
  const { open } = useCreateTaskModal();

  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
  });

  return (
    <Tabs
      defaultValue={view}
      onValueChange={setView}
      dir="rtl"
      className="flex-1 w-full border rounded-lg"
    >
      <div className="h-full flex flex-col overflow-auto p-4 ">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
              جدول
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
              کنبان
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
              تقویم
            </TabsTrigger>
          </TabsList>
          <Button onClick={open} size="sm" className="w-full lg:w-auto">
            <PlusIcon className="size-4 " />
            جدید
          </Button>
        </div>
        <div className="my-4">
          <DottedSeparator className="my-4" />
        </div>
        {/* add filter */}
        <div>فیلتر داده ها</div>
        <div className="my-4">
          <DottedSeparator className="my-4" />
        </div>
        <>
          <TabsContent value="table" className="mt-0">
            جدول داده ها
            {JSON.stringify(tasks)}
          </TabsContent>
          <TabsContent value="kanban" className="mt-0">
            کنبن داده ها
            {JSON.stringify(tasks)}
          </TabsContent>
          <TabsContent value="calendar" className="mt-0">
            تقویم داده ها
            {JSON.stringify(tasks)}
          </TabsContent>
        </>
      </div>
    </Tabs>
  );
};
