import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

import React from "react";

function LoginForm() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden bg-white border border-gray-300 p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-4 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your account
                </p>
              </div>
              <div className="grid gap-2 mt-10">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="border border-gray-300 text-gray-700"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forget-password"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                  className="border border-gray-300 text-gray-700"
                />
              </div>
              <Button
                type="submit"
                className="w-full border border-gray-300 text-gray-700 !bg-primary"
              >
                Login
              </Button>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src="https://img.freepik.com/free-photo/3d-internet-secuirty-badge_1048-18106.jpg?t=st=1742292202~exp=1742295802~hmac=d99a525556bbcd97c838a4fd1096f96c957c2ed8379fccfab5791529cdb5e12c&w=826"
              alt="Image"
              fill
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our{" "}
        <Link href="/">Terms of Service</Link> and{" "}
        <Link href="/">Privacy Policy</Link>.
      </div>
    </div>
  );
}

export default LoginForm;
