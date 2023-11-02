import styles from "@/styles/testResult.module.scss";
import { getRiskState } from "../Test/lib/util";
import { useMemo } from "react";
import { TEST_RESULT_CONTENT } from "../Test/lib/data";
import Image from "next/image";

const TestResult = ({ risk }: { risk: number | null }) => {
  const riskPercent = useMemo(
    () => (risk ? risk * 100 : 100).toFixed(1),
    [risk]
  );

  const riskState = useMemo(
    () => getRiskState(parseFloat(riskPercent)),
    [riskPercent]
  );
  return (
    <>
      <div className={styles["test-result-wrapper"]}>
        <div className={styles["test-result-header"]}>
          your risk for diabetes is
        </div>
        <div className={styles["test-result-number"]}>
          <span className={styles[riskState]}>{riskPercent}%</span>
        </div>
        <div
          className={`${styles[riskState]} ${styles["result-content-wrapper"]}`}
        >
          <div className={styles["icon-wrapper"]}>
            <Image
              priority={true}
              src={
                riskState === "low" || riskState === "very-low"
                  ? "/confirm.svg"
                  : "/alert.svg"
              }
              width={50}
              height={50}
              alt="An icon to visualize the test result."
            />
          </div>
          <div className={`${styles["text-wrapper"]}`}>
            <div className={styles["test-result-subject"]}>
              {riskState.replaceAll("-", " ")}
            </div>
            <div className={`${styles["test-result-content"]}`}>
              {TEST_RESULT_CONTENT[riskState]}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestResult;
