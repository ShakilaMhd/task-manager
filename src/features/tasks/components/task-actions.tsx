import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";
import React from "react";

interface TaskActionsProps {
  id: string;
  projectId: string;
  children: React.ReactNode;
}

export const TaskActions = ({ id, projectId, children }: TaskActionsProps) => {
  return (
    <div className="flex justify-end" >
      <DropdownMenu modal={false} dir="rtl">
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 flex flex-col items-center p-[5px]">
          <DropdownMenuItem
            onClick={() => {}}
            disabled={false}
            className="font-medium "
          >
            جزئیات تسک
            <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {}}
            disabled={false}
            className="font-medium "
          >
            بازکردن پروژه
            <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {}}
            disabled={false}
            className="font-medium "
          >
            ویرایش تسک
            <PencilIcon className="size-4 mr-2 stroke-2" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {}}
            disabled={false}
            className=" text-amber-700 focus:text-amber-700 font-medium "
          >
            حذف تسک
            <TrashIcon className="size-4 mr-2 stroke-2" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
