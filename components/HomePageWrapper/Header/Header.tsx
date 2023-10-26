import { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";

import useMediaQuery from "@/hooks/useMediaQuery";

import styles from "@/styles/header.module.scss";

import HMenu from "./HMenu";
import RMenu from "./RMenu";
import SharedHeader from "@/components/shared/Header";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
});

const Header = () => {
  const [smallScreen] = useMediaQuery({ queries: ["sm-500"] });
  const [hMenuOpen, setHMenuOpen] = useState(false);

  useEffect(() => {
    if (smallScreen === undefined) return;
    if (!smallScreen) setHMenuOpen(false);
  }, [smallScreen]);

  return (
    <>
      <div className={`${styles["header-wrapper"]}`}>
        <SharedHeader />
        <div className={`${montserrat.className} ${styles["header-content"]}`}>
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
