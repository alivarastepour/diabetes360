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
import { error } from "console";

const Test = () => {
  const [compactMode, setCompactMode] = useState(false);
  const [formError, setFormError] = useState("");
  const [risk, setRisk] = useState<number | null>(null);

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
        setFormError("");
      }

      function isFormComplete() {
        let unanswered = questionnaireState.answers.filter((item, index) => {
          if (compactMode) {
            const isInCompact = comapctQuestionnaire.findIndex(
              (item) => item.id === index
            );
            return isInCompact === -1 ? false : item === "";
          }
          return item === "";
        }).length;
        const invalidNumebrInputs =
          document.querySelectorAll("input:invalid").length;
        unanswered += invalidNumebrInputs;

        if (unanswered === 0) return true;
        return false;
      }

      function submitAnswers() {
        const formComplete = isFormComplete();
        setFormError(
          formComplete
            ? ""
            : "*please make sure that all fields have acceptable values."
        );
        if (!formComplete) return;

        const logits = calculateLogits(questionnaireState.answers, compactMode);
        const newRisk = sigmoid(logits);
        slideToQuestion(questionnaireState.current + 1);
        setRisk(newRisk);
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

  const handleInputChangeCallback = useCallback(handleInputChange, [
    setQuestionnaire,
  ]);

  return (
    <TestPresenter
      MAX_QUESTION={MAX_QUESTION}
      MIN_QUESTION={MIN_QUESTION}
      compactMode={compactMode}
      handleInputChangeCallback={handleInputChangeCallback}
      questionnaire={compactMode ? comapctQuestionnaire : questionnaire}
      questionnaireState={questionnaireState}
      setCompactMode={setCompactMode}
      risk={risk}
      error={formError}
    />
  );
};

export default Test;
