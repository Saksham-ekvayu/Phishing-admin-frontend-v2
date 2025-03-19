"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import loginPageBackground from "@/assets/login_page_background.png";
import { useDispatch } from "react-redux";
import { AuthenticationThunk } from "@/redux/actions/auth/auth.action";
import { ValidationHelper } from "@/helpers/validation.helper";
import { useRouter } from "next/navigation";
import { InputAdornment } from "@mui/material";
import { Icon } from "../icon";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faKey,
} from "@fortawesome/free-solid-svg-icons";

type FormState =
  | "login"
  | "otp"
  | "forgotPassword"
  | "forgotPasswordOtp"
  | "resetPassword";

function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formState, setFormState] = useState<FormState>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = () => {
    const validation = ValidationHelper.emailValidator(email);
    setEmailError(validation.message);
    return validation.isValid;
  };

  const validatePassword = () => {
    const validation = ValidationHelper.validateNotEmpty(password);
    setPasswordError(validation.message);
    return validation.isValid;
  };

  const validateOtp = () => {
    const validation = ValidationHelper.validateNotEmpty(otp);
    setOtpError(validation.message);
    return validation.isValid;
  };

  const validateNewPassword = () => {
    const validation = ValidationHelper.validateNotEmpty(newPassword);
    setNewPasswordError(validation.message);
    return validation.isValid;
  };

  const validateConfirmPassword = () => {
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail() || !validatePassword()) {
      return;
    }

    setIsLoading(true);
    try {
      // In a real implementation, you would dispatch the login action
      // and handle the response to move to OTP verification
      // const response = await dispatch(AuthenticationThunk.adminSignIn({ email, password }));

      // For now, we'll just simulate moving to OTP verification
      setFormState("otp");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateOtp()) {
      return;
    }

    setIsLoading(true);
    try {
      // In a real implementation, you would verify the OTP
      // and redirect to the dashboard on success

      // For now, we'll just simulate a successful login
      router.push("/");
    } catch (error) {
      console.error("OTP verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail()) {
      return;
    }

    setIsLoading(true);
    try {
      // In a real implementation, you would dispatch an action to send a reset password email

      // For now, we'll just simulate moving to OTP verification for password reset
      setFormState("forgotPasswordOtp");
    } catch (error) {
      console.error("Forgot password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateOtp()) {
      return;
    }

    setIsLoading(true);
    try {
      // In a real implementation, you would verify the OTP

      // For now, we'll just simulate moving to reset password form
      setFormState("resetPassword");
    } catch (error) {
      console.error("OTP verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateNewPassword() || !validateConfirmPassword()) {
      return;
    }

    setIsLoading(true);
    try {
      // In a real implementation, you would dispatch an action to reset the password

      // For now, we'll just simulate going back to login
      setFormState("login");
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Reset password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = () => {
    switch (formState) {
      case "login":
        return (
          <form onSubmit={handleLogin}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                {/* <TextInputField
                  id="email"
                  type="email"
                  placeholder={EMAIL_ADDRESS}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  validation={ValidationHelper.emailValidator}
                  label="Email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon
                          icon={faEnvelope}
                          title="Email"
                          color="inherit"
                          size="small"
                          onlyIcon
                        />
                      </InputAdornment>
                    ),
                  }}
                /> */}
              </div>
              <div className="grid gap-2">
                {/* <TextInputField
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  validation={ValidationHelper.validateNotEmpty}
                  label="Password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon
                          icon={faLock}
                          title="Password"
                          color="inherit"
                          size="small"
                          onlyIcon
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon
                          icon={showPassword ? faEyeSlash : faEye}
                          title={
                            showPassword ? "Hide password" : "Show password"
                          }
                          onClick={handleShowPassword}
                          color="inherit"
                          size="small"
                          onlyIcon
                        />
                      </InputAdornment>
                    ),
                  }}
                /> */}
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="shadow-red-500 shadow-inner"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              <div className="text-center">
                <Button
                  variant="link"
                  className="text-sm text-blue-500"
                  onClick={() => setFormState("forgotPassword")}
                >
                  Forgot password?
                </Button>
              </div>
            </div>
          </form>
        );

      case "otp":
        return (
          <form onSubmit={handleOtpVerification}>
            <div className="grid gap-4">
              <div className="text-center mb-4">
                <p>We've sent a verification code to your email</p>
                <p className="font-medium">{email}</p>
              </div>
              <div className="grid gap-2">
                {/* <TextInputField
                  id="otp"
                  type="text"
                  placeholder="Enter verification code"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  validation={ValidationHelper.validateNotEmpty}
                  label="Verification Code"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon
                          icon={faKey}
                          title="OTP"
                          color="inherit"
                          size="small"
                          onlyIcon
                        />
                      </InputAdornment>
                    ),
                  }}
                /> */}
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify"}
              </Button>
              <div className="text-center">
                <Button
                  variant="link"
                  className="text-sm text-blue-500"
                  onClick={() => setFormState("login")}
                >
                  Back to login
                </Button>
              </div>
            </div>
          </form>
        );

      case "forgotPassword":
        return (
          <form onSubmit={handleForgotPassword}>
            <div className="grid gap-4">
              <div className="text-center mb-4">
                <p>Enter your email to receive a verification code</p>
              </div>
              <div className="grid gap-2">
                {/* <TextInputField
                  id="email"
                  type="email"
                  placeholder={EMAIL_ADDRESS}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  validation={ValidationHelper.emailValidator}
                  label="Email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon
                          icon={faEnvelope}
                          title="Email"
                          color="inherit"
                          size="small"
                          onlyIcon
                        />
                      </InputAdornment>
                    ),
                  }}
                /> */}
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Verification Code"}
              </Button>
              <div className="text-center">
                <Button
                  variant="link"
                  className="text-sm text-blue-500"
                  onClick={() => setFormState("login")}
                >
                  Back to login
                </Button>
              </div>
            </div>
          </form>
        );

      case "forgotPasswordOtp":
        return (
          <form onSubmit={handleForgotPasswordOtp}>
            <div className="grid gap-4">
              <div className="text-center mb-4">
                <p>We've sent a verification code to your email</p>
                <p className="font-medium">{email}</p>
              </div>
              <div className="grid gap-2">
                {/* <TextInputField
                  id="otp"
                  type="text"
                  placeholder="Enter verification code"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  validation={ValidationHelper.validateNotEmpty}
                  label="Verification Code"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon
                          icon={faKey}
                          title="OTP"
                          color="inherit"
                          size="small"
                          onlyIcon
                        />
                      </InputAdornment>
                    ),
                  }}
                /> */}
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify"}
              </Button>
              <div className="text-center">
                <Button
                  variant="link"
                  className="text-sm text-blue-500"
                  onClick={() => setFormState("forgotPassword")}
                >
                  Back
                </Button>
              </div>
            </div>
          </form>
        );

      case "resetPassword":
        return (
          <form onSubmit={handleResetPassword}>
            <div className="grid gap-4">
              <div className="text-center mb-4">
                <p>Create a new password</p>
              </div>
              <div className="grid gap-2">
                {/* <TextInputField
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  validation={ValidationHelper.validateNotEmpty}
                  label="New Password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon
                          icon={faLock}
                          title="Password"
                          color="inherit"
                          size="small"
                          onlyIcon
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon
                          icon={showPassword ? faEyeSlash : faEye}
                          title={
                            showPassword ? "Hide password" : "Show password"
                          }
                          onClick={handleShowPassword}
                          color="inherit"
                          size="small"
                          onlyIcon
                        />
                      </InputAdornment>
                    ),
                  }}
                /> */}
              </div>
              <div className="grid gap-2">
                {/* <TextInputField
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  validation={ValidationHelper.validateNotEmpty}
                  label="Confirm Password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon
                          icon={faLock}
                          title="Password"
                          color="inherit"
                          size="small"
                          onlyIcon
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon
                          icon={showPassword ? faEyeSlash : faEye}
                          title={
                            showPassword ? "Hide password" : "Show password"
                          }
                          onClick={handleShowPassword}
                          color="inherit"
                          size="small"
                          onlyIcon
                        />
                      </InputAdornment>
                    ),
                  }}
                /> */}
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
              <div className="text-center">
                <Button
                  variant="link"
                  className="text-sm text-blue-500"
                  onClick={() => setFormState("login")}
                >
                  Back to login
                </Button>
              </div>
            </div>
          </form>
        );

      default:
        return null;
    }
  };

  const getFormTitle = () => {
    switch (formState) {
      case "login":
        return "Sign In";
      case "otp":
        return "Verification";
      case "forgotPassword":
        return "Forgot Password";
      case "forgotPasswordOtp":
        return "Verification";
      case "resetPassword":
        return "Reset Password";
      default:
        return "";
    }
  };

  return (
    <div className="max-w-screen w-full mx-auto h-screen flex items-center justify-center">
      <Image
        src={loginPageBackground}
        alt="Login page background image"
        fill
        className="w-full h-full object-cover"
      />

      <div className="relative z-10 w-full max-w-md p-4">
        <Card className="backdrop-blur bg-white/50 shadow-lg border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {getFormTitle()}
            </CardTitle>
          </CardHeader>
          <CardContent>{renderForm()}</CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LoginForm;
