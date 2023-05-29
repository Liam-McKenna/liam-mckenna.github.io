import styles from "./navbar.module.scss";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <a href="#about">About</a>
      <a href="#experience">Experience</a>
      <a href="#education">Education</a>
    </div>
  );
};

export default Navbar;
