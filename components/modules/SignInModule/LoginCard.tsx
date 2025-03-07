"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import React from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

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
import { cn } from "@/utils/cn";
import { LoginFormSchema } from "@/utils/zod";
import { useSignInMutation } from "@/store/queries/auth";
import { updateUser } from "@/store/slices/auth/userSlice/userSlice";

interface CustomJwtPayload {
  PREFERRED_USERNAME?: string;
  USER_ID?: string;
  AVATAR_URL?: string;
  name?: string;
  email?: string;
}

export function LoginCard() {
  const router = useRouter();
  const dispatch = useDispatch();

  // React Hook Form with Zod schema
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [signIn] = useSignInMutation();

  const submitForm = async (data: z.infer<typeof LoginFormSchema>) => {
    try {
      const { email, password } = data;

      // Call backend API for login (your signIn mutation)
      const loginData = await signIn({ email, password }).unwrap();
      if (loginData.success) {
        const token = loginData.result.accessToken;
        Cookies.set("_access_token", loginData.result.accessToken, {
          expires: 7,
          secure: true,
        });

        const decoded: CustomJwtPayload = jwtDecode(token);
        dispatch(
          updateUser({
            userId: decoded.USER_ID,
            name: decoded.name,
            avatarUrl: decoded.AVATAR_URL,
            email: decoded.email,
          }),
        );
        // Redirect to homepage or another page
        router.push("/practice");
        toast.success("Welcome to Campscholar!");
      } else {
        toast("Login failed! Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast("Login failed! Please try again.");
    }
  };
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">
          Log in to your CampScholar account
        </CardTitle>
        <CardDescription>
          Enter student code and password to log in
        </CardDescription>
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

            <div className="flex justify-end">
              <Link
                className="font-light text-gray-600 hover:text-gray-800 focus:outline-none"
                href="/request-reset-password-token"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              className={cn(
                buttonVariants({ variant: "default" }),
                "mt-2 w-full",
              )}
              type="submit"
            >
              Log in
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
