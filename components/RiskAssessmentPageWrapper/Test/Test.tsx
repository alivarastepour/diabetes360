import styles from "@/styles/test.module.scss";
import {
  MIN_QUESTION,
  comapctQuestionnaire,
  getIntercept,
  getMaxQuestion,
  questionnaire,
} from "./data";
import { Montserrat, Tilt_Neon } from "next/font/google";
import { useCallback, useEffect, useState, useMemo } from "react";
import TestIntro from "./TestIntro";
import { sigmoid } from "./util";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "300", "500"],
});
const tiltNeon1 = Tilt_Neon({
  subsets: ["latin"],
  weight: ["400"],
});
interface IQuestionnaireState {
  current: number;
  anwsers: (number | string)[];
}

const Test = () => {
  const [compactMode, setCompactMode] = useState(false);
  const MAX_QUESTION = useMemo(
    () => getMaxQuestion(compactMode),
    [compactMode]
  );
  const [questionnaireState, setQuestionnaire] = useState<IQuestionnaireState>({
    anwsers: new Array(MAX_QUESTION + 1).fill(""),
    current: 0,
  });

  useEffect(() => {
    const element = document.getElementById("test-action-wrapper");
    if (!element) return;

    function handleTestAction(e: MouseEvent) {
      const target = e.target;
      const parent = e.currentTarget;
      if (Object.is(target, parent)) return;

      function slideToQuestion(questionId: number) {
        const elements = document.querySelectorAll(
          `.${styles["question-wrapper"]}`
        );
        if (!elements) return;

        const viewWidthOffset = -questionId * 100;
        const paddingOffset = 0.8 * questionId;

        elements.forEach((e) => {
          (
            e as HTMLElement
          ).style.transform = `translateX(calc(${viewWidthOffset}vw + ${paddingOffset}rem))`;
        });
      }

      function submitAnswers() {
        // const checkIndices = compactMode
        //   ? questionnaire
        //       .filter((item) => item.featureSelected)
        //       .map((item, _) => item.id)
        //   : questionnaire.map((item, _) => item.id);

        // function allValuesPresent() {
        //   return questionnaireState.anwsers
        //     .filter((_, i) => checkIndices.includes(i))
        //     .every((item) => item !== "");
        // }

        function getRisk() {
          const logits = questionnaireState.anwsers.map((item, i) => {
            if (compactMode) {
              const fs = questionnaire[i].featureSelected;
              if (fs) return questionnaire[i].featureSelectedWeight! * +item;
              else return 0;
            } else {
              return questionnaire[i].weight * +item;
            }
          });

          const logit =
            logits.reduce((a, b) => a + b) + getIntercept(compactMode);
          const risk = sigmoid(logit);
          return risk;
        }

        // const allAnswersAreGiven = allValuesPresent();
        const risk = getRisk();
      }

      const action = (e.target as HTMLElement).dataset.action;
      switch (action) {
        case "next":
          if (questionnaireState.current === MAX_QUESTION) break;
          const nextQuestion = questionnaireState.current + 1;
          slideToQuestion(nextQuestion);
          setQuestionnaire((prev) => ({ ...prev, current: nextQuestion }));
          break;
        case "prev":
          if (questionnaireState.current === MIN_QUESTION) break;
          const prevQuestion = questionnaireState.current - 1;
          slideToQuestion(prevQuestion);
          setQuestionnaire((prev) => ({ ...prev, current: prevQuestion }));
          break;
        case "submit":
          submitAnswers();
          break;
      }
    }

    element.addEventListener("click", handleTestAction);

    return () => {
      element.removeEventListener("click", handleTestAction);
    };
  }, [questionnaireState, compactMode]);

  const handleInputChange = (questionId: number, newValue: number) => {
    setQuestionnaire((prev) => {
      const newAnswers = prev.anwsers.map((item, i) => {
        return i !== questionId ? item : newValue;
      });
      return { ...prev, anwsers: newAnswers };
    });
  };

  const handleInputChangeCallback = useCallback(handleInputChange, [
    setQuestionnaire,
  ]);

  return (
    <>
      <TestIntro compactMode={compactMode} setCompactMode={setCompactMode} />
      <div className={`${montserrat.className} ${styles["test-container"]}`}>
        <div className={styles["test-background"]}></div>
        <div className={`${styles["test-wrapper"]}`}>
          {(compactMode ? comapctQuestionnaire : questionnaire).map((q, i) => {
            const {
              correspondingColumn,
              featureSelected,
              id,
              options,
              question,
              placeHolder,
            } = q;
            return (
              <div
                key={id}
                // id="question-wrapper"
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
                        tabIndex={-1}
                        className={montserrat.className}
                        type="number"
                        placeholder={placeHolder}
                        value={questionnaireState.anwsers[id]}
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
                              value={questionnaireState.anwsers[id]}
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
        </div>
        <div id="test-action-wrapper" className={styles["action-wrapper"]}>
          {questionnaireState.current !== MAX_QUESTION && (
            <button
              data-action="next"
              className={`${montserrat.className} ${styles["next"]}`}
            >
              next
            </button>
          )}
          {questionnaireState.current !== MIN_QUESTION && (
            <button
              data-action="prev"
              className={`${montserrat.className} ${styles["prev"]}`}
            >
              prev
            </button>
          )}
          {questionnaireState.current === MAX_QUESTION && (
            <button
              disabled={
                questionnaireState.anwsers.filter((item) => item !== "")
                  .length !==
                MAX_QUESTION + 1
              }
              data-action="submit"
              className={`${montserrat.className} ${styles["submit"]}`}
            >
              submit
            </button>
          )}
          {questionnaireState.current === MAX_QUESTION &&
            questionnaireState.anwsers.filter((item) => item !== "").length !==
              MAX_QUESTION + 1 && (
              <div className={styles["error-wrapper"]}>
                *please fill all questions before submitting your answer.
              </div>
            )}
        </div>
      </div>
      <div className={`${tiltNeon1.className} ${styles["large-background"]}`}>
        <div className={styles["large-background-header"]}>
          Assess your risk for diabetes with a quick test
        </div>
      </div>
    </>
  );
};

export default Test;
