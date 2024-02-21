import { useState, useEffect } from "react";
import styles from "./inputPassword.module.css";
import { IoEye, IoEyeOff } from "react-icons/io5";

const PasswordInput = ({ password, setPassword, stateLogin, handleStateLogin }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const emailInputState = !stateLogin
    ? styles.formGroupValid
    : styles.formGroupInvalid;

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
  };

  useEffect(() => {
    if (stateLogin) {
      setTimeout(() => {
        handleStateLogin(false);
      }, 3000);
    }
  }, [stateLogin, handleStateLogin]);

  return (
    <div className={emailInputState}>
      <input
        value={password}
        onChange={handlePasswordChange}
        placeholder="Enter password"
        type={passwordVisible ? "text" : "password"}
        id="password"
        name="password"
        required
      />
      <span
        id="showPass"
        className={styles.showPass}
        onClick={togglePasswordVisibility}
      >
        {passwordVisible ? <IoEye color="black" /> : <IoEyeOff color="black" />}
      </span>
    </div>
  );
};

export default PasswordInput;
