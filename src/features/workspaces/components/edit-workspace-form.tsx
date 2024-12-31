"use client";

import { z } from "zod";
import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DottedSeparator } from "@/components/dotted-separator";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { updateWorkspaceSchema } from "../schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeftIcon, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Workspace } from "../types";
import { useUpdateWorkspace } from "../api/use-update-workspace";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteWorkspace } from "../api/use-delete-workspace";

interface EditWorkSpaceFormProps {
  onCancel?: () => void;
  initialValues: Workspace;
}

export const EditWorkSpaceForm = ({
  onCancel,
  initialValues,
}: EditWorkSpaceFormProps) => {
  const router = useRouter();
  const { mutate, isPending } = useUpdateWorkspace();
  const { mutate: deleteWorkspace, isPending: isDeletingWorkspace } =
    useDeleteWorkspace();

  const [DeleteDialog, confirmDelete] = useConfirm(
    "حذف فضای کاری",
    "این عمل قابل برگشت نیست",
    "destructive"
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: { ...initialValues, image: initialValues.imageUrl ?? "" },
  });

  const handleDelete = async () => {
    const ok = await confirmDelete();

    if (!ok) return;

    // console.log("deleting...");
    deleteWorkspace(
      {
        param: { workspaceId: initialValues.$id },
      },
      {
        onSuccess: () => {
          router.push("/");
        },
      }
    );
  };

  const onSubmit = (values: z.infer<typeof updateWorkspaceSchema>) => {
    // console.log({ values });
    const finalValues = {
      ...values,
      iamge: values.image instanceof File ? values.image : "",
    };
    mutate(
      { form: finalValues, param: { workspaceId: initialValues.$id } },
      {
        onSuccess: ({ data }) => {
          form.reset();
          // onCancel?.()
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <DeleteDialog />
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex flex-row justify-between items-center p-7  space-y-0">
          <CardTitle className="text-xl font-bold">
            {/* یک فضای کاری جدید ایجاد کنید */}
            {initialValues.name}
          </CardTitle>
          <Button
            size="sm"
            variant="secondary"
            onClick={
              onCancel
                ? onCancel
                : () => router.push(`/workspaces/${initialValues.$id}`)
            }
          >
            برگشت
            <ArrowLeftIcon className="size-4 mr-2" />
          </Button>
        </CardHeader>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نام فضای کاری</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="نام فضای کاری" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <div className="felx flex-col gap-y-2">
                      <div className="flex items-center gap-x-5">
                        {field.value ? (
                          <div className="size-[72px] relative rounded-md overflow-hidden">
                            <Image
                              alt="Logo"
                              fill
                              className="object-cover"
                              src={
                                field.value instanceof File
                                  ? URL.createObjectURL(field.value)
                                  : field.value
                              }
                            />
                          </div>
                        ) : (
                          <Avatar className="size-[72px]">
                            <AvatarFallback>
                              <ImageIcon className="size-[36px] text-neutral-400" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex flex-col">
                          <p className="text-sm">آیکون فضای کاری</p>
                          <p className="text-sm text-muted-foreground">
                            JPEG,JPG,SVG,PNG max 1mb
                          </p>
                          <input
                            className="hidden"
                            type="file"
                            accept=".jpg, .png, jpeg,.svg"
                            ref={inputRef}
                            onChange={handleImageChange}
                            disabled={isPending}
                          />
                          {field.value ? (
                            <Button
                              type="button"
                              disabled={isPending}
                              variant="destructive"
                              size="xs"
                              className="w-fit mt-2 p-2"
                              onClick={() => {
                                field.onChange(null);
                                if (inputRef.current) {
                                  inputRef.current.value = "";
                                }
                              }}
                            >
                              حذف عکس
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              disabled={isPending}
                              variant="teritary"
                              size="xs"
                              className="w-fit mt-2 p-2"
                              onClick={() => inputRef.current?.click()}
                            >
                              آپلود عکس
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                />
              </div>
              <div className="py-7">
                <DottedSeparator />
              </div>
              <div className="flex items-center justify-between">
                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  disabled={isPending}
                >
                  ذخیره تغییرات{" "}
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="secondary"
                  onClick={onCancel}
                  disabled={isPending}
                  className={cn(!onCancel && "invisible")}
                >
                  لغو
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold items-end">danger zone</h3>
            <p className="text-sm text-muted-foreground">
              حذف یک فضای کاری برگشت ناپذیر است و تمام داده های مرتبط را حذف می
              کند
            </p>
            <div className="">
              <Button
                className="mt-6 w-fit ml-auto"
                size="sm"
                variant="destructive"
                type="button"
                disabled={isPending || isDeletingWorkspace}
                onClick={handleDelete}
              >
                حذف
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
