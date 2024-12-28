import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";
import { getWorkspace } from "@/features/workspaces/actions";
import { EditWorkSpaceForm } from "@/features/workspaces/components/edit-workspace-form";

interface WorkspaceIdSettingsPageProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdSettingsPage = async ({
  params,
}: WorkspaceIdSettingsPageProps) => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  const initialValues = await getWorkspace({ workspaceId: params.workspaceId });

  if (!initialValues) {
    redirect(`/workspaces/${params.workspaceId}`);
  }

  return <EditWorkSpaceForm initialValues={initialValues}/>
};

export default WorkspaceIdSettingsPage;