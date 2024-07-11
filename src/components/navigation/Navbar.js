"use client";
import Link from "next/link";
import { useState } from 'react'
import Image from "next/image";
import logo from '/public/LMK-logo.svg'

import styles from "./navbar.module.scss";

const Navbar = () => {

  const [open, setOpen] = useState(false)



  return (
    <div className="fixed z-10 top-0 w-100 flex justify-center">
      <div className={`${styles.hamburger}`} onClick={() => setOpen(!open)}>
        <div className={`${open ? styles.line1Active : styles.line1}`}></div>
        <div className={`${open ? styles.line2Active : styles.line2}`}></div>
        <div className={`${open ? styles.line3Active : styles.line3}`}></div>
      </div>

      <div className={`${styles.container} ${open ? styles.navOpen : styles.navClose}`}>
        <div className={styles.navbar} onClick={() => setOpen(false)}>
          <Link href="/#intro" scroll={true}>
            {`//Introduction`}
          </Link>
          <Link href="/#expertise" scroll={true}>
            {`//Expertise`}
          </Link>

          <Image className={styles.logo} src={logo} width={75} height={70} />

          <Link href="/#experience" scroll={true}>
            {`//Experience`}
          </Link>
          <Link href="/#education" scroll={true}>
            {`//Education`}
          </Link>
        </div>
      </div >
    </div>
  );
};

export default Navbar;
