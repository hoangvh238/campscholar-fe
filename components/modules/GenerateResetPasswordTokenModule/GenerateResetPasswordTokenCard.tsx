import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
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
import { RequestEmailConfirmationFormSchema } from "@/utils/zod";
import { useGenerateResetPasswordTokenMutation } from "@/store/queries/auth";
import { constants } from "@/settings";

export function GenerateResetPasswordTokenCard() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof RequestEmailConfirmationFormSchema>>({
    resolver: zodResolver(RequestEmailConfirmationFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const [generateResetPasswordToken] = useGenerateResetPasswordTokenMutation();

  const submitForm = async (
    data: z.infer<typeof RequestEmailConfirmationFormSchema>,
  ) => {
    setIsSubmitted(true);

    try {
      const { email } = data;

      // Call backend API for login (your signIn mutation)
      const response = await generateResetPasswordToken({ email }).unwrap();
      if (response.success) {
        toast.success(
          "Send request successfully!\nPlease check your mail box.",
        );
      } else {
        toast.error("Email is invalid or does not exist!\nPlease re-check.");
      }
      form.reset({
        email: "",
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
        <CardDescription>Enter your email to reset password</CardDescription>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@gmail.com" {...field} />
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
                Submit
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
