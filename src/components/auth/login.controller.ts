import { RefObject, useRef, useState, useCallback, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { ITextInputFieldData, ITextInputFieldRef } from "@/components";
import {
  SIGNIN_SUCCESSFUL,
  SOMETHING_WENT_WRONG,
  EMAIL_ADDRESS,
  PASSWORD,
} from "@/constants";
import { SnackbarTypeEnum, RoutePathEnum } from "@/enum";
import { useAppSnackbar } from "@/hooks/snackbar.hook";
import { useAppDispatch, AuthenticationThunk } from "@/redux";
import { IAdminLogInRequest } from "@/interfaces";
import { ValidationHelper } from "@/helpers/validation.helper";

type FormState =
  | "login"
  | "otp"
  | "forgotPassword"
  | "forgotPasswordOtp"
  | "resetPassword";

interface IAuthControllerResponse {
  getters: {
    email: string;
    password: string;
    showPassword: boolean;
    isProcessing: boolean;
    router: AppRouterInstance;
    formState: FormState;
    otp: string;
    newPassword: string;
    confirmPassword: string;
  };
  handlers: {
    onEmailChange: (event: ITextInputFieldData) => void;
    onPasswordChange: (event: ITextInputFieldData) => void;
    onOtpChange: (event: ITextInputFieldData) => void;
    onNewPasswordChange: (event: ITextInputFieldData) => void;
    onConfirmPasswordChange: (event: ITextInputFieldData) => void;
    handleShowPassword: () => void;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
    handleOtpVerification: (event: FormEvent<HTMLFormElement>) => Promise<void>;
    handleForgotPassword: (event: FormEvent<HTMLFormElement>) => Promise<void>;
    handleForgotPasswordOtp: (
      event: FormEvent<HTMLFormElement>
    ) => Promise<void>;
    handleResetPassword: (event: FormEvent<HTMLFormElement>) => Promise<void>;
    setFormState: (state: FormState) => void;
    handleResendOtp: () => Promise<void>;
  };
  ref: {
    emailRef: RefObject<ITextInputFieldRef | null>;
    passwordRef: RefObject<ITextInputFieldRef | null>;
    otpRef: RefObject<ITextInputFieldRef | null>;
    newPasswordRef: RefObject<ITextInputFieldRef | null>;
    confirmPasswordRef: RefObject<ITextInputFieldRef | null>;
  };
}

/**
 * @controller {logInController}
 * @return {IAuthControllerResponse}
 */
export const logInController = (): IAuthControllerResponse => {
  // React State
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [formState, setFormState] = useState<FormState>("login");
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Redux State
  const dispatch = useAppDispatch();

  // React Refs
  const emailRef = useRef<ITextInputFieldRef>(null);
  const passwordRef = useRef<ITextInputFieldRef>(null);
  const otpRef = useRef<ITextInputFieldRef>(null);
  const newPasswordRef = useRef<ITextInputFieldRef>(null);
  const confirmPasswordRef = useRef<ITextInputFieldRef>(null);

  // Next Router
  const router = useRouter();

  // Custom Hooks
  const { enqueueSnackbar } = useAppSnackbar();

  /**
   * @function {onEmailChange}-  Handle on Change of email
   * @param {ITextInputFieldData} event
   */
  const onEmailChange = useCallback((event: ITextInputFieldData): void => {
    if (!event.event) return;
    const { value } = event.event.target;
    setEmail(value);
  }, []);

  /**
   * @function {onPasswordChange} -  Handle on Change of Password
   * @param {ITextInputFieldData} event
   * @return {void}
   */
  const onPasswordChange = useCallback((event: ITextInputFieldData): void => {
    if (!event.event) return;
    const { value } = event.event.target;
    setPassword(value);
  }, []);

  /**
   * @function {onOtpChange} -  Handle on Change of OTP
   * @param {ITextInputFieldData} event
   * @return {void}
   */
  const onOtpChange = useCallback((event: ITextInputFieldData): void => {
    if (!event.event) return;
    const { value } = event.event.target;
    setOtp(value);
  }, []);

  /**
   * @function {onNewPasswordChange} -  Handle on Change of New Password
   * @param {ITextInputFieldData} event
   * @return {void}
   */
  const onNewPasswordChange = useCallback(
    (event: ITextInputFieldData): void => {
      if (!event.event) return;
      const { value } = event.event.target;
      setNewPassword(value);
    },
    []
  );

  /**
   * @function {onConfirmPasswordChange} -  Handle on Change of Confirm Password
   * @param {ITextInputFieldData} event
   * @return {void}
   */
  const onConfirmPasswordChange = useCallback(
    (event: ITextInputFieldData): void => {
      if (!event.event) return;
      const { value } = event.event.target;
      setConfirmPassword(value);
    },
    []
  );

  /**
   * @functions {handleShowPassword} - To handle to show password functionality
   * @return {void}
   */
  const handleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  /**
   * @function {isValidSubmittion} - Validate request before submittion
   * @return {boolean}
   */
  const isValidSubmittion = useCallback((): boolean => {
    const emailError = emailRef.current?.validateValue();
    const passwordError = passwordRef.current?.validateValue();

    if (!(emailError && passwordError)) {
      return true;
    }
    return false;
  }, []);

  /**
   * @function {isValidOtp} - Validate OTP before submittion
   * @return {boolean}
   */
  const isValidOtp = useCallback((): boolean => {
    const otpError = otpRef.current?.validateValue();

    if (!otpError) {
      return true;
    }
    return false;
  }, []);

  /**
   * @function {isValidResetPassword} - Validate reset password form
   * @return {boolean}
   */
  const isValidResetPassword = useCallback((): boolean => {
    const newPasswordError = newPasswordRef.current?.validateValue();
    const confirmPasswordError = confirmPasswordRef.current?.validateValue();

    if (!(newPasswordError && confirmPasswordError)) {
      return true;
    }

    if (newPassword !== confirmPassword) {
      enqueueSnackbar("Passwords do not match", SnackbarTypeEnum.ERROR);
      return true;
    }

    return false;
  }, [confirmPassword, enqueueSnackbar, newPassword]);

  /**
   * @function {handleSubmit} - To handle to sign in functionality
   * @return {Promise<void>}
   */
  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      if (isValidSubmittion()) {
        return;
      }

      setIsProcessing(true);

      const payload: IAdminLogInRequest = {
        email: email.trim(),
        password: password.trim(),
      };

      try {
        // const response = await dispatch(
        //   AuthenticationThunk.adminSignIn(payload) as any
        // ).unwrap();
        // enqueueSnackbar(SIGNIN_SUCCESSFUL, SnackbarTypeEnum.SUCCESS);
        setFormState("otp");
      } catch (error) {
        enqueueSnackbar(SOMETHING_WENT_WRONG, SnackbarTypeEnum.ERROR);
      }
      setIsProcessing(false);
    },
    [dispatch, email, enqueueSnackbar, isValidSubmittion, password]
  );

  /**
   * @function {handleOtpVerification} - To handle OTP verification
   * @return {Promise<void>}
   */
  const handleOtpVerification = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      if (isValidOtp()) {
        return;
      }

      setIsProcessing(true);

      try {
        // In a real implementation, you would verify the OTP
        // For now, we'll just simulate a successful verification
        enqueueSnackbar("Verification successful", SnackbarTypeEnum.SUCCESS);
        router.push(RoutePathEnum.HOME || "/");
      } catch (error) {
        enqueueSnackbar(SOMETHING_WENT_WRONG, SnackbarTypeEnum.ERROR);
      }
      setIsProcessing(false);
    },
    [enqueueSnackbar, isValidOtp, router]
  );

  /**
   * @function {handleResendOtp} - To handle resending OTP
   * @return {Promise<void>}
   */
  const handleResendOtp = useCallback(async (): Promise<void> => {
    setIsProcessing(true);

    try {
      // In a real implementation, you would dispatch an action to resend OTP
      // For now, we'll just simulate a successful resend

      // Different payload based on which form state we're in
      if (formState === "otp") {
        // For login OTP resend
        const payload: IAdminLogInRequest = {
          email: email.trim(),
          password: password.trim(),
        };

        // Here you would dispatch the actual resend OTP action
        // await dispatch(AuthenticationThunk.resendOtp(payload) as any);
      } else if (formState === "forgotPasswordOtp") {
        // For forgot password OTP resend
        // Here you would dispatch the forgot password resend OTP action
        // await dispatch(AuthenticationThunk.resendForgotPasswordOtp({ email: email.trim() }) as any);
      }

      enqueueSnackbar(
        "Verification code resent to your email",
        SnackbarTypeEnum.SUCCESS
      );
    } catch (error) {
      enqueueSnackbar(SOMETHING_WENT_WRONG, SnackbarTypeEnum.ERROR);
    }

    setIsProcessing(false);
  }, [dispatch, email, password, formState, enqueueSnackbar]);

  /**
   * @function {handleForgotPassword} - To handle forgot password request
   * @return {Promise<void>}
   */
  const handleForgotPassword = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      const emailError = emailRef.current?.validateValue();

      if (!emailError) {
        return;
      }

      setIsProcessing(true);

      try {
        // In a real implementation, you would dispatch an action to send a reset password email
        enqueueSnackbar(
          "Verification code sent to your email",
          SnackbarTypeEnum.SUCCESS
        );
        setFormState("forgotPasswordOtp");
      } catch (error) {
        enqueueSnackbar(SOMETHING_WENT_WRONG, SnackbarTypeEnum.ERROR);
      }
      setIsProcessing(false);
    },
    [enqueueSnackbar]
  );

  /**
   * @function {handleForgotPasswordOtp} - To handle OTP verification for password reset
   * @return {Promise<void>}
   */
  const handleForgotPasswordOtp = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      if (isValidOtp()) {
        return;
      }

      setIsProcessing(true);

      try {
        // In a real implementation, you would verify the OTP
        enqueueSnackbar("Verification successful", SnackbarTypeEnum.SUCCESS);
        setFormState("resetPassword");
      } catch (error) {
        enqueueSnackbar(SOMETHING_WENT_WRONG, SnackbarTypeEnum.ERROR);
      }
      setIsProcessing(false);
    },
    [enqueueSnackbar, isValidOtp]
  );

  /**
   * @function {handleResetPassword} - To handle password reset
   * @return {Promise<void>}
   */
  const handleResetPassword = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      if (isValidResetPassword()) {
        return;
      }

      setIsProcessing(true);

      try {
        // In a real implementation, you would dispatch an action to reset the password
        enqueueSnackbar("Password reset successful", SnackbarTypeEnum.SUCCESS);
        setFormState("login");
        setNewPassword("");
        setConfirmPassword("");
      } catch (error) {
        enqueueSnackbar(SOMETHING_WENT_WRONG, SnackbarTypeEnum.ERROR);
      }
      setIsProcessing(false);
    },
    [enqueueSnackbar, isValidResetPassword]
  );

  return {
    getters: {
      email,
      password,
      showPassword,
      isProcessing,
      router,
      formState,
      otp,
      newPassword,
      confirmPassword,
    },
    handlers: {
      onEmailChange,
      onPasswordChange,
      onOtpChange,
      onNewPasswordChange,
      onConfirmPasswordChange,
      handleShowPassword,
      handleSubmit,
      handleOtpVerification,
      handleForgotPassword,
      handleForgotPasswordOtp,
      handleResetPassword,
      setFormState,
      handleResendOtp,
    },
    ref: {
      emailRef,
      passwordRef,
      otpRef,
      newPasswordRef,
      confirmPasswordRef,
    },
  };
};
