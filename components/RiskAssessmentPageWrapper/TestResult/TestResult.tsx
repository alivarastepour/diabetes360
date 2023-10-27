import styles from "@/styles/testResult.module.scss";
import { getRiskState } from "../Test/lib/util";
import { useMemo } from "react";
import { TEST_RESULT_CONTENT } from "../Test/lib/data";

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
        <div className={styles["test-result-subject"]}>
          {riskState.replaceAll("-", " ")}
        </div>
        <div className={styles["test-result-content"]}>
          {TEST_RESULT_CONTENT[riskState]}
        </div>
      </div>
    </>
  );
};

export default TestResult;
