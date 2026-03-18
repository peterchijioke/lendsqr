"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "./login-form.module.scss";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.formGroup}>
        <input
          className={styles.formInput}
          type="email"
          id="email"
          placeholder="Email"
          autoComplete="email"
          {...register("email")}
        />
        {errors.email && (
          <span className={styles.errorMessage}>{errors.email.message}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <div className={styles.passwordWrapper}>
          <input
            className={`${styles.formInput} ${styles.formInputPassword}`}
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Password"
            autoComplete="current-password"
            {...register("password")}
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
          <span className={styles.errorMessage}>{errors.password.message}</span>
        )}
      </div>

      <a href="/forgot-password" className={styles.forgotLink}>
        Forgot password?
      </a>

      <button type="submit" className={styles.btnLogin} disabled={isSubmitting}>
        {isSubmitting ? "LOGGING IN..." : "LOG IN"}
      </button>
    </form>
  );
}
