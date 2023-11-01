import styles from "@/styles/test.module.scss";

import TestIntro from "../TestIntro.tsx/TestIntro";
import { Montserrat, Tilt_Neon } from "next/font/google";
import { ITestPresenterProps } from "@/interfaces/IPresenterProps";
import TestResult from "../TestResult/TestResult";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "300", "500", "600"],
});
const tiltNeon1 = Tilt_Neon({
  subsets: ["latin"],
  weight: ["400"],
});

const TestPresenter = ({
  compactMode,
  setCompactMode,
  questionnaireState,
  handleInputChangeCallback,
  questionnaire,
  MAX_QUESTION,
  MIN_QUESTION,
  risk,
  error,
}: ITestPresenterProps) => {
  return (
    <>
      <TestIntro compactMode={compactMode} setCompactMode={setCompactMode} />
      <div className={`${montserrat.className} ${styles["test-container"]}`}>
        <div
          className={`${risk && styles["no-background"]} ${
            styles["test-background"]
          }`}
        ></div>
        <div className={`${styles["test-wrapper"]}`}>
          {questionnaire.map((q, i) => {
            const { id, options, question, placeHolder, min, max } = q;
            return (
              <div
                key={id}
                data-id={"question-wrapper"}
                className={styles["question-wrapper"]}
              >
                <div className={styles["question"]}>
                  <span>{i + 1}- </span>
                  <span>{question}</span>
                </div>
                <div className={styles["question-options-wrapper"]}>
                  {typeof options === "string" ? (
                    <div className={`${styles["input-wrapper"]}`}>
                      <input
                        min={min}
                        max={max}
                        tabIndex={-1}
                        data-test-id={`input-number-${i + 1}`}
                        className={montserrat.className}
                        type="number"
                        placeholder={placeHolder}
                        value={questionnaireState.answers[id]}
                        onChange={(e) =>
                          handleInputChangeCallback(id, e.target.valueAsNumber)
                        }
                      />
                    </div>
                  ) : (
                    <div className={styles["options-wrapper"]}>
                      {options.map((option) => {
                        const [key, value] = Object.entries(option)[0];
                        return (
                          <div key={key} className={styles["option"]}>
                            <label htmlFor={`${key}-${value}-${id}`}>
                              {value}
                            </label>
                            <input
                              tabIndex={-1}
                              type="radio"
                              name={String(id)}
                              id={`${key}-${value}-${id}`}
                              value={questionnaireState.answers[id]}
                              data-test-id={`input-radio-${i + 1}-${key}`}
                              onChange={() =>
                                handleInputChangeCallback(id, +key)
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div
            data-id="question-wrapper"
            className={styles["question-wrapper"]}
          >
            <TestResult risk={risk} />
          </div>
        </div>
        {!risk && (
          <div id="test-action-wrapper" className={styles["action-wrapper"]}>
            {questionnaireState.current !== MAX_QUESTION && (
              <button
                data-test-id="next-question-button"
                data-action="next"
                className={`${montserrat.className} ${styles["next"]}`}
              >
                next
              </button>
            )}
            {questionnaireState.current !== MIN_QUESTION && (
              <button
                data-test-id="prev-question-button"
                data-action="prev"
                className={`${montserrat.className} ${styles["prev"]}`}
              >
                prev
              </button>
            )}
            {questionnaireState.current === MAX_QUESTION && (
              <button
                data-test-id="submit-question-button"
                // disabled={buttonStatus === "disabled"}
                data-action="submit"
                className={`${montserrat.className} ${styles["submit"]}`}
              >
                submit
              </button>
            )}
            {error !== "" && (
              <div
                data-test-id="form-error-wrapper"
                className={styles["error-wrapper"]}
              >
                *please make sure that all fields have acceptable values.
              </div>
            )}
          </div>
        )}
      </div>
      <div className={`${tiltNeon1.className} ${styles["large-background"]}`}>
        <div className={styles["large-background-header"]}>
          Assess your risk for diabetes with a quick test
        </div>
      </div>
    </>
  );
};

export default TestPresenter;
