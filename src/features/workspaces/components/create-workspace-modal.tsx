"use client"

import { ResponsiveModal } from "@/components/responsive-modal";

import { CreateWorkSpaceForm } from "./create-workspace-form";

export const CreateWorkspaceModal = () => {
  return (
    <ResponsiveModal open onOpenChange={() => {}}>
      <CreateWorkSpaceForm />
    </ResponsiveModal>
  );
};
