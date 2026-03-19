"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login-form.module.scss";
import { authService, LoginCredentials } from "@/services/authService";

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateEmail = (email: string): string | undefined => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email address";
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return undefined;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const newErrors: FormErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const credentials: LoginCredentials = { email, password };
      const user = await authService.login(credentials);
      if (user) {
        router.push("/dashboard");
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Invalid email or password");
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: "email" | "password") => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit} noValidate>
      <div className={styles.formGroup}>
        <input
          className={styles.formInput}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          autoComplete="email"
          onChange={() => handleInputChange("email")}
        />
        {errors.email && (
          <span className={styles.errorMessage}>{errors.email}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <div className={styles.passwordWrapper}>
          <input
            className={`${styles.formInput} ${styles.formInputPassword}`}
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Password"
            autoComplete="current-password"
            onChange={() => handleInputChange("password")}
          />
          <button
            type="button"
            className={styles.btnShow}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "HIDE" : "SHOW"}
          </button>
        </div>
        {errors.password && (
          <span className={styles.errorMessage}>{errors.password}</span>
        )}
      </div>

      <a href="/forgot-password" className={styles.forgotLink}>
        Forgot password?
      </a>

      {submitError && (
        <span className={styles.errorMessage}>{submitError}</span>
      )}

      <button type="submit" className={styles.btnLogin} disabled={isSubmitting}>
        {isSubmitting ? "LOGGING IN..." : "LOG IN"}
      </button>
    </form>
  );
}
