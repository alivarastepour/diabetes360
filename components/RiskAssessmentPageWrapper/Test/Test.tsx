import styles from "@/styles/test.module.scss";
import { MAX_QUESTION, MIN_QUESTION, questionnaire } from "./data";
import { Montserrat } from "next/font/google";
import { useEffect, useState } from "react";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "300"],
});
interface IQuestionnaireState {
  current: number;
  anwsers: { [index: number]: number }[];
}
const Test = () => {
  const [questionnaireState, setQuestionnaire] = useState<IQuestionnaireState>({
    anwsers: [],
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
        // const offset = `${viewWidthOffset}`;
        // console.log(
        //   `translateX(calc(${viewWidthOffset}vw + ${paddingOffset}rem))`
        // );

        elements.forEach((e) => {
          (
            e as HTMLElement
          ).style.transform = `translateX(calc(${viewWidthOffset}vw + ${paddingOffset}rem))`;
        });
        // element.style.transform = `translateX(calc(${viewWidthOffset}vw + ${paddingOffset}rem))`;
      }

      const action = (e.target as HTMLElement).dataset.action;
      switch (action) {
        case "next":
          if (questionnaireState.current === MAX_QUESTION) break;
          // const answer =
          //   !!questionnaireState.anwsers[questionnaireState.current];
          // if (!answer) break;
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
          break;
      }
    }

    element.addEventListener("click", handleTestAction);

    return () => {
      element.removeEventListener("click", handleTestAction);
    };
  }, [questionnaireState]);

  return (
    <>
      <div className={styles["test-container"]}>
        <div className={`${montserrat.className} ${styles["test-wrapper"]}`}>
          {questionnaire.map((q) => {
            const {
              correspondingColumn,
              featureSelected,
              id,
              options,
              question,
            } = q;
            return (
              <div
                key={id}
                // id="question-wrapper"
                className={styles["question-wrapper"]}
              >
                <div className={styles["question"]}>
                  <span>{id + 1}- </span>
                  <span>{question}</span>
                </div>
                <div className={styles["question-options-wrapper"]}>
                  {typeof options === "string" ? (
                    <div className="input-wrapper">
                      <input type="text" />
                    </div>
                  ) : (
                    options.map((option) => {
                      const [key, value] = Object.entries(option)[0];
                      return (
                        <div key={key} className={styles["option"]}>
                          <input
                            type="radio"
                            name={`${key}-${value}`}
                            id={`${key}-${value}-${id}`}
                          />
                          <label htmlFor="">{value}</label>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div id="test-action-wrapper" className={styles["action-wrapper"]}>
          <button data-action="next">next</button>
          <button data-action="prev">prev</button>
          <button data-action="submit">submit</button>
        </div>
      </div>
    </>
  );
};

export default Test;
