"use client";
import Link from "next/link";
import Image from "next/image";
import logo from '/public/LMK-logo.svg'

import styles from "./navbar.module.scss";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
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
      <div className={styles.blur}></div>
    </div>
  );
};

export default Navbar;
