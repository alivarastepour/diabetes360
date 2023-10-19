import { useState } from "react";
import { Tilt_Neon } from "next/font/google";
import Link from "next/link";
import styles from "@/styles/header.module.scss";
const titltNeon = Tilt_Neon({
  subsets: ["latin"],
  weight: ["400"],
});

const Header = () => {
  const [hMenuOpen, setHMenuOpen] = useState(false);
  return (
    <>
      <div className={styles["header-wrapper"]}>
        <div className={`${styles["header-logo"]} ${titltNeon.className}`}>
          <Link href={"/"}>
            <span>Diabetes</span>
            <span>360</span>
          </Link>
        </div>
        <div className={styles["header-content"]}>
          <div
            id="header-h-menu-logo-wrapper"
            onClick={() => {
              setHMenuOpen((prev) => !prev);
            }}
            className={`${styles["header-h-menu-logo-wrapper"]} ${
              hMenuOpen
                ? styles["header-h-menu-open"]
                : styles["header-h-menu-close"]
            }`}
          >
            <div className={styles["header-h-menu-logo-item"]}></div>
            <div className={styles["header-h-menu-logo-item"]}></div>
            <div className={styles["header-h-menu-logo-item"]}></div>
          </div>
          {hMenuOpen ? (
            <div className={styles["h-menu-content"]}>h_menu</div>
          ) : (
            <div className={styles["reg-menu-content"]}>reg_menu</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
