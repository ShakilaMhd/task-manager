import { z } from "zod";
import { TaskStatus } from "./types";

export const createTaskSchema = z.object({
  name: z.string().trim().min(1, "required"),
  status: z.nativeEnum(TaskStatus, { required_error: "required" }),
  workspaceId: z.string().trim().min(1, "required"),
  projectId: z.string().trim().min(1, "required"),
  dueDate: z.coerce.date(),
  assigneeId: z.string().trim().min(1, "required"),
  description: z.string().optional(), 
});
