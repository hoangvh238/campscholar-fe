"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button, buttonVariants } from "@/components/core/common/button";
import { Input } from "@/components/core/common/input";
import { cn } from "@/utils/cn";
import { AuthorizeSchema, FormSchema } from "@/utils/zod";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/core/common/form";

export function EmailForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      toast("Thank you for joining the waitlist!");
    } catch {
      toast("An error occurred. Please try again later.");
    }
  }
  return (
    <Card className="m-4 p-4 md:p-6">
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-4">
            <h2 className="text-center text-lg font-semibold md:text-2xl">
              Be part of the{" "}
              <span className="mx-1 font-serif font-semibold italic text-[#FF6600] underline">
                future
              </span>{" "}
              of competitive programming
            </h2>
            <p className="mx-auto max-w-md text-center text-sm text-muted-foreground md:text-base">
              Join the waitlist to get early access to CampScholar. We&apos;ll
              notify you when we&apos;re ready to onboard new users.
            </p>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm dark:text-white">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    {...field}
                    className={cn({
                      "border-red-500": form.formState.errors.name,
                    })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm dark:text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your email"
                    {...field}
                    className={cn({
                      "border-red-500": form.formState.errors.email,
                    })}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  We&apos;ll send you a welcome email.
                </FormDescription>
              </FormItem>
            )}
          />

          <Button
            className={cn(buttonVariants({ variant: "default" }), "w-full")}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </Card>
  );
}

export function UserAuthForm({ children }: { children?: React.ReactNode }) {
  const form = useForm<z.infer<typeof AuthorizeSchema>>({
    resolver: zodResolver(AuthorizeSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(data: z.infer<typeof AuthorizeSchema>) {
    try {
      toast("Account created successfully!");
    } catch (error) {
      toast(String(error));
    }
  }
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Sign up to get started with CampScholar.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">{children}</div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with email
            </span>
          </div>
        </div>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className={cn(
                buttonVariants({ variant: "default" }),
                "mt-4 w-full",
              )}
              type="submit"
            >
              Sign Up
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
