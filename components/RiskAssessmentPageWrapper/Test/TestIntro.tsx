import styles from "@/styles/testIntro.module.scss";
import { useCallback, useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import { TSetState } from "@/types/TSetState";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "300", "500"],
});
const TestIntro = ({
  compactMode,
  setCompactMode,
}: {
  compactMode: boolean;
  setCompactMode: TSetState<boolean>;
}) => {
  const [open, setOpen] = useState(true);

  const handleIntroClose = () => {
    setOpen(false);
  };

  const handleIntroCloseCallback = useCallback(handleIntroClose, []);

  useEffect(() => {
    const element = document.getElementById("test-intro-select");
    if (!element) return;

    const toggleSelect = () => {
      setCompactMode((prev) => !prev);
    };

    element.addEventListener("click", toggleSelect);

    return () => {
      document.removeEventListener("click", toggleSelect);
    };
  }, []);
  return (
    <>
      {/* <div
        className={styles[`test-intro-backdrop-${open ? "open" : "close"}`]}
      ></div> */}
      <div
        className={`${montserrat.className} ${styles["test-intro-wrapper"]} ${
          !open && styles["wrapper-close"]
        }`}
      >
        <div className={styles["test-intro-header"]}>choose test mode</div>
        <div className={styles["test-intro-explaination"]}>
          Full test, considers a wider range of factors in your life. Compact
          test, only considers known risk factors of Diabetes. Both tests have
          acceptable accuracy.
        </div>
        <div id="test-intro-select" className={styles["test-intro-select"]}>
          <div className={styles["toggle-text"]}>compact mode</div>
          <div className={styles["toggle-wrapper"]}>
            <div
              className={`${compactMode ? styles["compact"] : styles["full"]} ${
                styles["toggle-indicator"]
              }`}
            ></div>
          </div>
        </div>
        <div className={styles["intro-actions"]}>
          <div>
            <button
              onClick={handleIntroCloseCallback}
              className={montserrat.className}
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestIntro;
