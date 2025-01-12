import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { DatePicker } from "@/components/date-picker";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListCheckIcon, ListChecksIcon } from "lucide-react";
import { TaskStatus } from "../types";

interface DataFiltersProps {
  hideProjectFilter?: boolean;
}

export const DataFilters = ({ hideProjectFilter }: DataFiltersProps) => {
  const workspaceId = useWorkspaceId();

  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId,
  });

  const isLoading = isLoadingProjects || isLoadingMembers;

  const projectOptions = projects?.documents.map((project) => ({
    value: project.$id,
    label: project.name,
  }));

  const memberOptions = members?.documents.map((member) => ({
    value: member.$id,
    label: member.name,
  }));

  if (isLoading) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <Select defaultValue={undefined} onValueChange={() => {}}>
        <SelectTrigger className="w-full lg:w-auto h-8 ">
          <div className="flex items-center pr-2">
            <ListChecksIcon className="size-4 h-4 w-4 mr-2" />
            <SelectValue placeholder="همه وضعیت ها" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">همه وضعیت ها</SelectItem>
          <SelectSeparator />
          <SelectItem value={TaskStatus.BACKLOG}>BackLog</SelectItem>
          <SelectItem value={TaskStatus.IN_PROGRESS}>IN_PROGRESS</SelectItem>
          <SelectItem value={TaskStatus.IN_REVIEW}>IN_REVIEW</SelectItem>
          <SelectItem value={TaskStatus.TODO}>TODO</SelectItem>
          <SelectItem value={TaskStatus.DONE}>DONE</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
