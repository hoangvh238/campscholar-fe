import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import { cn } from "@/utils/cn";
import { Button, buttonVariants } from "@/components/core/common/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/core/common/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/core/common/form";
import { Input } from "@/components/core/common/input";
import { ResetPasswordFormSchema } from "@/utils/zod";
import { useResetPasswordMutation } from "@/store/queries/auth";
import { constants } from "@/settings";

export function ResetPasswordCard() {
  const searchParams = useSearchParams();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const [resetPassword] = useResetPasswordMutation();

  const submitForm = async (data: z.infer<typeof ResetPasswordFormSchema>) => {
    setIsSubmitted(true);

    const email = searchParams.get("email") ?? "";
    const token = searchParams.get("token") ?? "";
    try {
      const { newPassword } = data;

      // Call backend API for login (your signIn mutation)
      const response = await resetPassword({
        password: newPassword,
        email,
        token,
      }).unwrap();
      if (response.success) {
        toast.success("Reset password successfully!");
      } else {
        toast.error("Can not reset password!\nPlease re-check.");
      }
      form.reset({
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      console.error(constants.API_ERROR_LOG_MESSAGE, error);
      toast.error(constants.API_ERROR_TOAST_MESSAGE);
    }
    setIsSubmitted(false);
  };
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Reset password</CardTitle>
        <CardDescription>Enter your new email</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* Form with validation */}
        <Form {...form}>
          <form
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit(submitForm)}
          >
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm new password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isSubmitted ? (
              <Button
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "mt-2 w-full",
                )}
                type="button"
              >
                <Spin
                  className="text-whiteEmail is invalid or does not exist!"
                  indicator={<LoadingOutlined spin />}
                  size="small"
                />
              </Button>
            ) : (
              <Button
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "mt-2 w-full",
                )}
                type="submit"
              >
                Save
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
