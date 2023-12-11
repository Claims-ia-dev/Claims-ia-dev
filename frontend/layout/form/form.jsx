import styles from '@/styles/Home.module.css'
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useState } from 'react';
// import { UserLogin } from '@/controller/userOperations';

export default function Home() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // UserLogin(email, password);
    console.log('submit');
  }

  return (
    <>
      <main>
        <section className={styles.formContainer}>
          <article className={styles.formInfoContainer}>
            <div className={styles.titleContainer}></div>
            <div className={styles.form}>
              <form>
                <div className={styles.formGroup}>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter email'
                    type="email" id="email"
                    name="email" />
                </div>
                <div className={styles.formGroup}>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter password'
                    type={passwordVisible ? 'text' : 'password'}
                    id="password" name="password" />
                  <span id="showPass" className={styles.showPass} onClick={togglePasswordVisibility}>
                    {passwordVisible ? <IoEye color='black'/> : < IoEyeOff color='black'/>}
                  </span>
                </div>
                <div className={`${styles.formGroup} ${styles.displayFlex}`}>
                  <div className={styles.textContainer}>
                    <a href="/.">No account? <u>No problem</u></a>
                  </div>
                  <button onClick={handleSubmit} type="submit">Sign in</button>
                </div>
                <div className={styles.formGroup}>
                  <p>Incorrect email or password</p>
                </div>
              </form>

            </div>
          </article>

        </section>
        <section className={styles.imageContainer}>

        </section>
      </main>
    </>
  )
}
