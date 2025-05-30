"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthError, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/db/firebase";
import { showToast } from "@/lib/MessageToast";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function RequestForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const handleRequest = async (data: LoginFormValues) => {
    try {
      const actionCodeSettings = {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?mode=resetPassword`,
        handleCodeInApp: true,
      };

      await sendPasswordResetEmail(auth, data.email, actionCodeSettings);
      showToast("Password reset email sent. Check your inbox.", "success");
      // Optionally, redirect to login after sending the email:
      redirect("/login");
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "code" in error) {
        const firebaseError = error as AuthError;

        if (firebaseError.message === "auth/invalid-email") {
          showToast("Invalid email address.", "warning");
        } else if (firebaseError.message === "auth/user-not-found") {
          showToast("User not found.", "error");
        } else {
          showToast("An error occurred. Please try again later.", "error");
          console.error("Forgot Password error:", error);
        }
      } else {
        showToast("An unexpected error occurred.", "error");
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Forgot your Password?</CardTitle>
          <CardDescription>
            Enter your email to request reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full"
                onClick={handleSubmit(handleRequest)}
              >
                Request to Reset
              </Button>
              <Link
                href="/login"
                type="submit"
                className="w-full text-center text-xs underline-offset-4 hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
