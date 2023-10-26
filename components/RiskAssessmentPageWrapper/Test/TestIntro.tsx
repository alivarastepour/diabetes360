import styles from "@/styles/testIntro.module.scss";
import { useEffect, useState } from "react";

const TestIntro = () => {
  const [compactMode, setCompactMode] = useState(false);
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
      <div className={styles["test-intro-backdrop"]}></div>
      <div className={styles["test-intro-wrapper"]}>
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
      </div>
    </>
  );
};

export default TestIntro;
