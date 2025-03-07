import { z } from "zod";

export const AuthorizeSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password != data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const FormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
});

export const LoginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const RequestEmailConfirmationFormSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const ResetPasswordFormSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmNewPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .superRefine(({ newPassword, confirmNewPassword }, ctx) => {
    if (confirmNewPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmNewPassword"],
      });
    }
  });

export const CreateContestSchema = z
  .object({
    name: z.string().min(1, "Contest name is required"), // Không được trống

    startTime: z.string().refine((value) => {
      const startTime = new Date(value);
      const minStartTime = new Date();
      minStartTime.setDate(minStartTime.getDate() + 2); // Phải cách hiện tại ít nhất 2 ngày
      return startTime >= minStartTime;
    }, "Start time must be at least 2 days from now"),

    registrationDeadline: z
      .string()
      .min(1, "Registration deadline is required"), // Không được trống
    endTime: z.string().min(1, "End time is required"),

    participantType: z.number().min(0).max(1),

    teamSize: z
      .number()
      .min(2, "Team size must be at least 2")
      .max(5, "Team size cannot exceed 5")
      .optional(),
  })
  .superRefine((data, ctx) => {
    const startDate = new Date(data.startTime);
    const endDate = new Date(data.endTime);
    const regDate = new Date(data.registrationDeadline);

    const minRegDeadline = new Date(startDate);
    minRegDeadline.setDate(minRegDeadline.getDate() - 1);
    if (regDate.getTime() > minRegDeadline.getTime()) {
      ctx.addIssue({
        code: "custom",
        message:
          "Registration deadline must be at least 1 day before the start time.",
        path: ["registrationDeadline"],
      });
    }

    if (endDate <= startDate) {
      ctx.addIssue({
        code: "custom",
        message: "End time must be after start time",
        path: ["endTime"],
      });
    }

    if (
      data.participantType === 0 &&
      (data.teamSize === undefined || data.teamSize < 2 || data.teamSize > 5)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Team size must be between 2 and 5",
        path: ["teamSize"],
      });
    }
  });
