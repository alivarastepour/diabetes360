import {
  comapctQuestionnaire,
  getIntercept,
  getMaxQuestion,
  getMinQuestion,
  questionnaire,
} from "./data";
import { useCallback, useEffect, useState, useMemo } from "react";
import { sigmoid } from "./util";
import TestPresenter from "./TestPresenter";
import { IQuestionnaireState } from "@/interfaces/IQuestionnaireState";
import { TButtonStatus } from "@/types/TSubmitButtonStatus";
import { TErrorStatus } from "@/types/TErrorStatus";

const Test = () => {
  const [compactMode, setCompactMode] = useState(false);
  const MAX_QUESTION = useMemo(
    () => getMaxQuestion(compactMode),
    [compactMode]
  );
  const MIN_QUESTION = useMemo(getMinQuestion, []);
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
          'div[data-id="question-wrapper"]'
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

  function handleSubmitDisable(): [TButtonStatus, TErrorStatus] {
    let unanswered = 0;
    if (compactMode) {
      const comapctQuestionnaireIds = comapctQuestionnaire.map(
        (item) => item.id
      );
      unanswered = questionnaireState.anwsers
        .filter((_, index) => comapctQuestionnaireIds.includes(index))
        .filter((item) => item === "").length;
    } else {
      unanswered = questionnaireState.anwsers.filter(
        (item) => item === ""
      ).length;
    }

    // console.log(unansweredCurrent);

    console.log(unanswered);

    if (
      unanswered === 1 &&
      questionnaireState.anwsers[questionnaireState.current] === ""
    ) {
      return ["disabled", "no-error"];
    }
    if (unanswered > 1 && questionnaireState.current === MAX_QUESTION) {
      return ["disabled", "error"];
    } else {
      return ["enabled", "no-error"];
    }
  }

  const handleInputChangeCallback = useCallback(handleInputChange, [
    setQuestionnaire,
  ]);
  const [buttonStatus, errorStatus] = useMemo(handleSubmitDisable, [
    questionnaireState,
    compactMode,
  ]);

  return (
    <TestPresenter
      MAX_QUESTION={MAX_QUESTION}
      MIN_QUESTION={MIN_QUESTION}
      buttonStatus={buttonStatus}
      compactMode={compactMode}
      errorStatus={errorStatus}
      handleInputChangeCallback={handleInputChangeCallback}
      questionnaire={compactMode ? comapctQuestionnaire : questionnaire}
      questionnaireState={questionnaireState}
      setCompactMode={setCompactMode}
    />
  );
};

export default Test;
