import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-4 md:p-10">
      {/* <div className="w-full max-w-sm md:max-w-3xl"> */}
      <div className="lg:w-[70vw] w-full mx-auto">
        <LoginForm />
      </div>
    </div>
  );
}
