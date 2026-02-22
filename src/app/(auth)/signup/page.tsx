"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { FieldError, FormError } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormFields } from "@/hooks/useFormFields";

type SignUpForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignUpErrors = {
  form: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpPage() {
  const router = useRouter();
  const { form, setField } = useFormFields<SignUpForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<SignUpErrors>({
    form: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setErrors({ form: "", password: "", confirmPassword: "" });

    const normalizedEmail = form.email.trim().toLowerCase();

    if (form.password !== form.confirmPassword) {
      setErrors({
        form: "",
        password: "Passwords do not match",
        confirmPassword: "Passwords do not match",
      });
      return;
    }

    if (form.password.length < 8) {
      setErrors({
        form: "",
        password: "Password must be at least 8 characters",
        confirmPassword: "",
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: normalizedEmail,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors((prev) => ({
          ...prev,
          form: data.error || "Something went wrong",
        }));
        return;
      }

      // Auto sign-in after successful registration
      const result = await signIn("credentials", {
        email: normalizedEmail,
        password: form.password,
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        setErrors((prev) => ({
          ...prev,
          form: "Account created but sign-in failed. Please sign in manually.",
        }));
      } else {
        router.replace("/");
      }
    } catch {
      setErrors((prev) => ({
        ...prev,
        form: "Something went wrong. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-secondary">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-secondary/35"
      />

      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
        <Card className="w-full max-w-md border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-secondary">
              Create Account
            </CardTitle>
            <CardDescription>
              Join FindMyPadel and start playing
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <FormError id="signup-error" message={errors.form} />
              <div className="grid grid-cols-2 gap-4">
                <div className="gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={form.firstName}
                    onChange={(e) => setField("firstName", e.target.value)}
                    autoComplete="given-name"
                    aria-invalid={Boolean(errors.form)}
                    aria-describedby={errors.form ? "signup-error" : undefined}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={(e) => setField("lastName", e.target.value)}
                    autoComplete="family-name"
                    aria-invalid={Boolean(errors.form)}
                    aria-describedby={errors.form ? "signup-error" : undefined}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  autoComplete="email"
                  aria-invalid={Boolean(errors.form)}
                  aria-describedby={errors.form ? "signup-error" : undefined}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 8 characters"
                  value={form.password}
                  onChange={(e) => setField("password", e.target.value)}
                  autoComplete="new-password"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? "signup-password-error" : undefined
                  }
                  required
                  minLength={8}
                  disabled={isLoading}
                />
                <FieldError
                  id="signup-password-error"
                  message={errors.password}
                />
              </div>
              <div className="gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  onChange={(e) => setField("confirmPassword", e.target.value)}
                  autoComplete="new-password"
                  aria-invalid={Boolean(errors.confirmPassword)}
                  aria-describedby={
                    errors.confirmPassword
                      ? "signup-confirm-password-error"
                      : undefined
                  }
                  required
                  minLength={8}
                  disabled={isLoading}
                />
                <FieldError
                  id="signup-confirm-password-error"
                  message={errors.confirmPassword}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 pt-3">
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={
                  isLoading ||
                  !form.firstName.trim() ||
                  !form.lastName.trim() ||
                  !form.email.trim() ||
                  !form.password ||
                  !form.confirmPassword
                }
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-medium text-secondary hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </section>
  );
}
