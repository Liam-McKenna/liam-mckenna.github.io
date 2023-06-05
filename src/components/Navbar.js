import Link from "next/link";

import styles from "./navbar.module.scss";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Link href="/#intro" scroll={false}>
          About
        </Link>
        <Link href="/#skills" scroll={false}>
          Skills
        </Link>
        <Link href="/#experience" scroll={false}>
          Experience
        </Link>
        <Link href="/#education" scroll={false}>
          Education
        </Link>
      </div>
      <div className={styles.blur}></div>
    </div>
  );
};

export default Navbar;
