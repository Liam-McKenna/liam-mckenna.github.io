"use client";
import Link from "next/link";

import styles from "./navbar.module.scss";

const Navbar = () => {
  function scrollToIntro() {
    const introElement = document.getElementById("intro");
    const yOffset = -250; // The desired offset in pixels
    const yPosition =
      introElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: yPosition, behavior: "smooth" });
  }

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <span onClick={scrollToIntro}>About</span>

        <Link href="/#skills" scroll={true}>
          Skills
        </Link>
        <Link href="/#experience" scroll={true}>
          Experience
        </Link>
        <Link href="/#education" scroll={true}>
          Education
        </Link>
      </div>
      <div className={styles.blur}></div>
    </div>
  );
};

export default Navbar;
