"use client";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dir } from "fs";
import { PlusIcon } from "lucide-react";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";

export const TaskViewSwitcher = () => {
  const { open} = useCreateTaskModal();

  return (
    <Tabs dir="rtl" className="flex-1 w-full border rounded-lg">
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
          </TabsContent>
          <TabsContent value="kanban" className="mt-0">
            کنبن داده ها
          </TabsContent>
          <TabsContent value="calendar" className="mt-0">
            تقویم داده ها
          </TabsContent>
        </>
      </div>
    </Tabs>
  );
};
