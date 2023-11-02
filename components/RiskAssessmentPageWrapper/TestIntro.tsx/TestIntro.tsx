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
      <div
        data-test-id="test-intro-backdrop"
        className={styles[`test-intro-backdrop-${open ? "open" : "close"}`]}
      ></div>
      <div
        data-test-id="test-intro-wrapper"
        className={`${montserrat.className} ${styles["test-intro-wrapper"]} ${
          !open && styles["wrapper-close"]
        }`}
      >
        <div className={styles["test-intro-header"]}>choose test mode</div>
        <div className={styles["test-intro-explaination"]}>
          We've prepared 2 sets of questions for you. The first set, includes
          more questions and takes more risk factors into account. The second
          set(compact mode), is actually a subset of the former and takes only
          the most important risk factors of Diabetes into account.
        </div>
        <div
          id="test-intro-select"
          data-test-id="test-intro-select"
          className={styles["test-intro-select"]}
        >
          <div className={styles["toggle-text"]}>compact mode</div>
          <div className={styles["toggle-wrapper"]}>
            <div
              data-test-id="toggle-indicator"
              className={`${compactMode ? styles["compact"] : styles["full"]} ${
                styles["toggle-indicator"]
              }`}
            ></div>
          </div>
        </div>
        <div className={styles["intro-actions"]}>
          <div>
            <button
              data-test-id="start-test"
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
