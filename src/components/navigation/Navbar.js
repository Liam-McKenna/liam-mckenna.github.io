"use client";
import Link from "next/link";
import { useState } from 'react'
import Image from "next/image";
import logo from '/public/LMK-logo.svg'

import styles from "./navbar.module.scss";

const Navbar = () => {

  const [open, setOpen] = useState(false)



  return (
    <div>
      <div className={`${styles.hamburger}`} onClick={() => setOpen(!open)}>
        <div className={styles.line1}></div>
        <div className={styles.line2}></div>
        <div className={styles.line3}></div>
      </div>

      <div className={`${styles.container} ${open ? styles.navOpen : styles.navClose}`}>
        <div className={styles.blur}>
          <div className={styles.navbar} onClick={() => setOpen(false)}>
            <Link href="/#intro" scroll={true}>
              {`//Introduction`}
            </Link>
            <Link href="/#skills" scroll={true}>
              {`//Skills`}
            </Link>
            <Image src={logo} width={75} height={70} />
            <Link href="/#experience" scroll={true}>
              {`//Experience`}
            </Link>
            <Link href="/#education" scroll={true}>
              {`//Education`}
            </Link>
          </div>
          {/* {
        isMobile &&
        (<Link>Hello</Link>)
      } */}
        </div>
      </div >
    </div>
  );
};

export default Navbar;
