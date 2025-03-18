import React from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-gray-100">
      {children}
    </main>
  );
}
