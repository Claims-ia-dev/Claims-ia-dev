import styles from "../../src/App.module.css";
import InputEmail from "../../components/inputs/email/inputEmail";
import InputPassword from "../../components/inputs/password/inputPassword";
import { logInUser } from "../../controller/userOperation";
import { useAuth } from "../../controller/AuthContext";
import { useState, useEffect } from "react";

export const AdminWindow = () => {
  const { logout } = useAuth();

  return (
    <div className={styles.adminContainer}>
      <h1>Admin</h1>
      <button onClick={logout}>Log out</button>
    </div>
  );
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);
  const { login, isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }

    const loginResult = await logInUser({ email, password });
    if (loginResult) {
      login();
      setEmail("");
      setPassword("");
    } else {
      setEmail("");
      setPassword("");
      setErrorLogin(true);
    }
  };

  useEffect(() => {
    if (errorLogin) {
      setTimeout(() => {
        setErrorLogin(false);
      }, 3000);
    }
  }, [errorLogin]);

  return (
    <>
      <main>
        <section className={styles.formContainer}>
          <article className={styles.formInfoContainer}>
            <div className={styles.titleContainer}></div>
            <div className={styles.form}>
              <form>
                <InputEmail
                  email={email}
                  setEmail={setEmail}
                  stateLogin={errorLogin}
                />
                <InputPassword
                  password={password}
                  setPassword={setPassword}
                  stateLogin={errorLogin}
                  handleState={setErrorLogin}

                />
                <div className={`${styles.formGroup} ${styles.displayFlex}`}>
                  <div className={styles.textContainer}>
                    <a href="/.">
                      No account? <u>No problem</u>
                    </a>
                  </div>
                  <button onClick={handleSubmit} type="submit">
                    Sign in
                  </button>
                </div>
                {errorLogin && (
                  <div className={`${styles.formGroup} ${styles.animationIn}`}>
                    <p>Incorrect email or password</p>
                  </div>
                )}
              </form>
            </div>
          </article>
        </section>
        <section className={styles.imageContainer}></section>
      </main>

      {isAuthenticated ? <AdminWindow /> : <></>}
    </>
  );
}
