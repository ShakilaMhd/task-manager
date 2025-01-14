import React from "react";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteTask } from "../api/use-delete-task";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useEditTaskModal } from "../hooks/use-edit-task-modal copy";

interface TaskActionsProps {
  id: string;
  projectId: string;
  children: React.ReactNode;
}

export const TaskActions = ({ id, projectId, children }: TaskActionsProps) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

const {open} = useEditTaskModal()

  const [ConfirmDialog, confirm] = useConfirm(
    "حذف تسک",
    "این عمل قابل برگشت نیست",
    "destructive"
  );

  const { mutate, isPending } = useDeleteTask();

  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) return;

    mutate({ param: { taskId: id } });
  };

  const onOpenTask = () => {
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  };

  const onOpenProject = () => {
    router.push(`/workspaces/${workspaceId}/projects/${projectId}`);
  };

  return (
    <div className="flex justify-end">
      <ConfirmDialog />
      <DropdownMenu modal={false} dir="rtl">
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-40 flex flex-col items-center p-[5px]"
        >
          <DropdownMenuItem onClick={onOpenTask} className="font-medium ">
            جزئیات تسک
            <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onOpenProject} className="font-medium ">
            بازکردن پروژه
            <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => open(id)} className="font-medium ">
            ویرایش تسک
            <PencilIcon className="size-4 mr-2 stroke-2" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onDelete}
            disabled={isPending}
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
