import { getCurrent } from "@/features/auth/queries";
import { Divide } from "lucide-react";
import { redirect } from "next/navigation";
import { TaskIdClient } from "./client";

const TaskPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <TaskIdClient />
};

export default TaskPage;
