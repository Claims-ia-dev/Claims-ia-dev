import { useState } from 'react';
import styles from './form.module.css';
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import InputPassword from '../inputs/password/inputPassword';

export default function Form(){
  const [isRightPanelActive, setRightPanelActive] = useState(false);

  const handleSignUpClick = () => {
    setRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setRightPanelActive(false);
  };

  return (
    <div className={`${styles.container} ${isRightPanelActive ? styles['right-panel-active'] : ''}`} id={styles.container}>
      <div className={`${styles['form-container']} ${styles['sign-up-container']}`}>
        <form>
          <h1>Create Account</h1>
          <div className={styles['social-container']}>
            <a href="#" className={styles.social}><FaFacebook color='black'/></a>
            <a href="#" className={styles.social}><FaInstagram color='black'/></a>
            <a href="#" className={styles.social}><FaWhatsapp color='black'/></a>
          </div>
          <span>Create an account</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <InputPassword />
          <button>Sign Up</button>
        </form>
      </div>
      <div className={`${styles['form-container']} ${styles['sign-in-container']}`}>
        <form>
          <h1>Sign In</h1>
          <div className={styles['social-container']}>
            <a href="#" className={styles.social}><FaFacebook color='black'/></a>
            <a href="#" className={styles.social}><FaInstagram color='black'/></a>
            <a href="#" className={styles.social}><FaWhatsapp color='black'/></a>
          </div>
          <span>Already have account?</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign In</button>
        </form>
      </div>

      <div className={styles['overlay-container']}>
        <div className={styles.overlay}>
          <div className={`${styles['overlay-panel']} ${styles['overlay-left']}`}>
            <h1>Welcome Back</h1>
            <p>If you already have an account, please login here.</p>
            <button className={styles.ghost} onClick={handleSignInClick}>Sign In</button>
          </div>
          <div className={`${styles['overlay-panel']} ${styles['overlay-right']}`}>
            <h1>Hello</h1>
            <p>Don`t have an account? Please sign up!</p>
            <button className={styles.ghost} onClick={handleSignUpClick}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

