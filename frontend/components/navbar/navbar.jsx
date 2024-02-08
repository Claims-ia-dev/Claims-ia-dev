import styles from './navbar.module.css';


export default function  Navbar ({ handleLogOut }) {
    return (
      <nav className={styles.navbarContainer}>
        <ul>
          <li>
            <img src="/logo.svg" alt="Logo Claims.AI" />
          </li>
          <li>
            <button className={styles.logOutBtn} onClick={() => { handleLogOut(); }}>
              Log out
            </button>
          </li>
        </ul>
      </nav>
    );
  };