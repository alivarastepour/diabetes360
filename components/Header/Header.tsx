import { useEffect, useState } from "react";
import { Tilt_Neon } from "next/font/google";
import Link from "next/link";
import styles from "@/styles/header.module.scss";
import HMenu from "./HMenu";
import RMenu from "./RMenu";
import useMediaQuery from "@/hooks/useMediaQuery";
const titltNeon = Tilt_Neon({
  subsets: ["latin"],
  weight: ["400"],
});

const Header = () => {
  const [smallScreen] = useMediaQuery({ queries: ["sm-500"] });
  const [hMenuOpen, setHMenuOpen] = useState(false);

  console.log(smallScreen, hMenuOpen);

  useEffect(() => {
    if (smallScreen === undefined) return;
    if (!smallScreen) setHMenuOpen(false);
  }, [smallScreen]);

  return (
    <>
      <div className={`${titltNeon.className} ${styles["header-wrapper"]}`}>
        <div className={`${styles["header-logo"]}`}>
          <Link href={"/"}>
            <span>Diabetes</span>
            <span>360</span>
          </Link>
        </div>
        <div className={styles["header-content"]}>
          {smallScreen && (
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
          )}
          {smallScreen && hMenuOpen && <HMenu />}
          {!smallScreen && <RMenu />}
        </div>
      </div>
    </>
  );
};

export default Header;
