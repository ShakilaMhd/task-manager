"use client";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useInviteCode } from "../hooks/use-invite-code";
import { useJoinWorkspace } from "../api/use-join-workspace";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface JoinWorkspaceFormProps {
  initialValues: {
    name: string;
  };
}

export const JoinWorkspaceForm = ({
  initialValues,
}: JoinWorkspaceFormProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const inviteCode = useInviteCode();
  const { mutate, isPending } = useJoinWorkspace();

  const onSubmit = () => {
    mutate(
      {
        param: { workspaceId },
        json: { code: inviteCode },
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">پیوستن به فضای کاری</CardTitle>
        <CardDescription>
          پیوستن به فضای کاری {initialValues.name}
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <div className="flex flex-col lg:flex-row gap-2 items-center justify-between">
          <Button
            variant="secondary"
            type="button"
            size="lg"
            className="w-full lg:w-fit"
            onClick={onSubmit}
            disabled={isPending}
          >
            پیوستن به قضای کاری
          </Button>
          <Button
            variant="secondary"
            type="button"
            asChild
            size="lg"
            className="w-full lg:w-fit"
            disabled={isPending}
          >
            <Link href="/">لغو</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
