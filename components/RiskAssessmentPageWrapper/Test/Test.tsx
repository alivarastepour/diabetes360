import { comapctQuestionnaire, questionnaire } from "./lib/data";
import { useCallback, useEffect, useState, useMemo } from "react";
import {
  calculateLogits,
  getMaxQuestion,
  getMinQuestion,
  sigmoid,
  slideToQuestion,
} from "./lib/util";
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
    answers: new Array(MAX_QUESTION + 1).fill(""),
    current: 0,
  });

  useEffect(() => {
    const element = document.getElementById("test-action-wrapper");
    if (!element) return;

    function handleTestAction(e: MouseEvent) {
      const target = e.target;
      const parent = e.currentTarget;
      if (Object.is(target, parent)) return;

      function nextQuestion() {
        if (questionnaireState.current === MAX_QUESTION) return;

        const nextQuestion = questionnaireState.current + 1;
        slideToQuestion(nextQuestion);
        setQuestionnaire((prev) => ({ ...prev, current: nextQuestion }));
      }

      function prevQuestion() {
        if (questionnaireState.current === MIN_QUESTION) return;

        const prevQuestion = questionnaireState.current - 1;
        slideToQuestion(prevQuestion);
        setQuestionnaire((prev) => ({ ...prev, current: prevQuestion }));
      }

      function submitAnswers() {
        const logits = calculateLogits(questionnaireState.answers, compactMode);
        const risk = sigmoid(logits);
        console.log(risk);
      }

      const action = (e.target as HTMLElement).dataset.action;
      switch (action) {
        case "next":
          nextQuestion();
          break;
        case "prev":
          prevQuestion();
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
      const newAnswers = prev.answers.map((item, i) => {
        return i !== questionId ? item : newValue;
      });
      return { ...prev, answers: newAnswers };
    });
  };

  function handleSubmitDisable(): [TButtonStatus, TErrorStatus] {
    // todo : full test mode doesn't work properly when last question is not ticked
    let unanswered = 0;
    if (compactMode) {
      const comapctQuestionnaireIds = comapctQuestionnaire.map(
        (item) => item.id
      );
      unanswered = questionnaireState.answers
        .filter((_, index) => comapctQuestionnaireIds.includes(index))
        .filter((item) => item === "").length;
    } else {
      unanswered = questionnaireState.answers.filter(
        (item) => item === ""
      ).length;
    }

    if (
      unanswered === 1 &&
      questionnaireState.answers[questionnaireState.current] === ""
    )
      return ["disabled", "no-error"];
    if (unanswered > 1 && questionnaireState.current === MAX_QUESTION)
      return ["disabled", "error"];
    return ["enabled", "no-error"];
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
