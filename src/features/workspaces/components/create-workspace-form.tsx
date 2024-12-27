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

import { createWorkspaceSchema } from "../schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface CreateWorkspaceFormProps {
  onCancel?: () => void;
}

export const CreateWorkSpaceForm = ({ onCancel }: CreateWorkspaceFormProps) => {
  const router = useRouter()
  const { mutate, isPending } = useCreateWorkspace();

  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = (values: z.infer<typeof createWorkspaceSchema>) => {
    // console.log({ values });
    const finalValues = {
      ...values,
      iamge: values.image instanceof File ? values.image : "",
    };
    mutate(
      { form: finalValues },
      {
        onSuccess: ({data}) => {
          form.reset();
          // onCancel?.()
          router.push(`/workspaces/${data.$id}`)
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
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">
          یک فضای کاری جدید ایجاد کنید
        </CardTitle>
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
                        <Button
                          type="button"
                          disabled={isPending}
                          variant="teritary"
                          size="xs"
                          className="w-fit mt-2"
                          onClick={() => inputRef.current?.click()}
                        >
                          آپلود عکس
                        </Button>
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
                ایجاد فضای کاری
              </Button>
              <Button
                type="button"
                size="lg"
                variant="secondary"
                onClick={onCancel}
                disabled={isPending}
              >
                لغو
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
