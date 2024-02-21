import styles from "./inputEmail.module.css";
import { useState, useEffect } from "react";

export default function EmailInput({email, setEmail, stateLogin, handleStateLogin}) {
  const [isValidEmail, setIsValidEmail] = useState(true);


  const handleEmailChange = async (e) => {
    const inputEmail = e.target.value;
    await setEmail(inputEmail)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(inputEmail === "" || emailRegex.test(inputEmail));
  };

  const emailInputState = isValidEmail
    ? styles.formGroupValid
    : styles.formGroupInvalid;

    const emailInputStateLogIn = !stateLogin
    ? styles.formGroupValid
    : styles.formGroupInvalidLogIn;


    useEffect(() => {
      if (stateLogin) {
        setTimeout(() => {
          handleStateLogin(false);
        }, 3000);
      }
    }, [stateLogin, handleStateLogin]);

  return (
    <>
      <div className={`${!stateLogin ? emailInputState  : emailInputStateLogIn}`}>
        <input
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter email"
          type="email"
          id="email"
          name="email"
          required
          pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
        />
        {!isValidEmail && <p>Please provide a valid email</p>}
      </div>
    </>
  );
}
