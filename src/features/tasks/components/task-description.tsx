import { Button } from "@/components/ui/button";
import { Task } from "../types";
import { PencilIcon, XIcon } from "lucide-react";
import { DottedSeparator } from "@/components/dotted-separator";
import { useState } from "react";
import { useUpdateTask } from "../api/use-update-task";
import { Textarea } from "@/components/ui/textarea";

interface TaskDescriptionProps {
  task: Task;
}

export const TaskDescription = ({ task }: TaskDescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.description);

  const { mutate, isPending } = useUpdateTask();

  const handleSave = () => {
    mutate({
      json: { description: value },
      param: { taskId: task.$id },
    }, {
      onSuccess:() => {
        setIsEditing(false)
      }
    });
  };

  return (
    <div className="p-4 border rounded-lg ">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">نمای کلی</p>
        <Button
          onClick={() => setIsEditing((prev) => !prev)}
          size="sm"
          variant="secondary"
        >
          {isEditing ? (
            <XIcon className="size-4 mr-2" />
          ) : (
            <PencilIcon className="siez-4 mr-2" />
          )}
          {isEditing ? "لغو" : "ویرایش"}
        </Button>
      </div>
      <div className="my-4">
        <DottedSeparator />
      </div>
      {isEditing ? (
        <div className="fle xflex-col gap-y-4">
          <Textarea
            placeholder="توضیحات را اضافه کنین"
            value={value}
            rows={4}
            onChange={(e) => setValue(e.target.value)}
            disabled={isPending}
          />
          <Button
            size="sm"
            className="w-fit ml-auto"
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? "در حال ذخیره سازی" : "تغیرات ذخیره شد"}
          </Button>
        </div>
      ) : (
        <div>
          {task.description || (
            <span className="text-muted-foreground">توضیحاتی وجود ندارد</span>
          )}
        </div>
      )}
    </div>
  );
};
