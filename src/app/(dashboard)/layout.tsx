import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { CreateProjectModal } from "@/features/projects/components/create-project-modal";
import { CreateTaskModal } from "@/features/tasks/components/create-task-modal";
import { EditTaskModal } from "@/features/tasks/components/eidt-task-modal";
import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen">
      <CreateWorkspaceModal />
      <CreateProjectModal />
      <CreateTaskModal />
      <EditTaskModal />
      <div className="flex w-full h-full ">
        <div className="fixed right-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
          <Sidebar />
        </div>
        <div className="lg:pr-[264px] w-full">
          <div className="mx-auto  max-w-screen-2xl h-full">
            <Navbar />
            <main className="h-full flex flex-col py-8 px-6 ">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
