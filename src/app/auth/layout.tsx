import React from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="login-layout">
      <div className="login-container">
        <div className="login-logo">
          <h1>Phishing Admin</h1>
        </div>
        <div className="login-content">{children}</div>
        <div className="login-footer">
          <p>© {new Date().getFullYear()} Phishing Admin Dashboard</p>
        </div>
      </div>
    </div>
  );
}
