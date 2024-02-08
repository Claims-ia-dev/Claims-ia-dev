import styles from "../../src/App.module.css";
import InputEmail from "../../components/inputs/email/inputEmail";
import InputPassword from "../../components/inputs/password/inputPassword";
import { logInUser } from "../../controller/userOperation";
import { useUserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);
  const { setUserData } = useUserData();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }

    const loginResult = await logInUser({ email, password });
    const { data } = loginResult;

    if (loginResult) {
      setUserData((prev) => ({
        ...prev,
        email: data[0].email,
        password: data[0].password,
        id: data[0].id,
        loginState: true,
      }));
      navigate(`/admin/user/${data[0].id}`);
    } else {
      setUserData({ email: "", password: "" });
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
                    <a href="/">
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
    </>
  );
}
