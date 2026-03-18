import LoginForm from "../components/login-form/login-form";
import styles from "./login.module.scss";
export default async function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <aside className={styles.loginLeft}>
        <a href="/" className={styles.logo}>
          <img src="/logo.svg" />
        </a>

        <div className={styles.heroIllustration}>
          <img src="/login/pablo-sign-in 1.svg" />
        </div>
      </aside>

      <main className={styles.loginRight}>
        <div className={styles.loginFormWrap}>
          <h1 className={styles.loginTitle}>Welcome.</h1>
          <p className={styles.loginSubtitle}>Enter details to login.</p>

          <LoginForm />
        </div>
      </main>
    </div>
  );
}
