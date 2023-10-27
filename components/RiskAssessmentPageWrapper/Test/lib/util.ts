import {
  COMPACT_MODE_INTERCEPT,
  CONTAINER_PADDING,
  INTERCEPT,
  MAX_VIEW_WIDTH,
  comapctQuestionnaire,
  questionnaire,
} from "./data";

export const sigmoid = (logit: number) => 1 / (1 + Math.pow(Math.E, -logit));

export const getMaxQuestion = (compact: boolean) =>
  compact ? comapctQuestionnaire.length - 1 : questionnaire.length - 1;

export const getMinQuestion = () => questionnaire[0].id;

export const getIntercept = (compact: boolean) =>
  compact ? COMPACT_MODE_INTERCEPT : INTERCEPT;

export const slideToQuestion = (questionId: number) => {
  const elements = document.querySelectorAll('div[data-id="question-wrapper"]');
  if (!elements) return;

  const viewWidthOffset = -questionId * MAX_VIEW_WIDTH;
  const paddingOffset = CONTAINER_PADDING * questionId;

  elements.forEach((e) => {
    (
      e as HTMLElement
    ).style.transform = `translateX(calc(${viewWidthOffset}vw + ${paddingOffset}rem))`;
  });
};

export const calculateLogits = (
  answers: (string | number)[],
  compactMode: boolean
) => {
  const logits = answers.map((item, i) => {
    if (compactMode) {
      const fs = questionnaire[i].featureSelected;
      if (fs) return questionnaire[i].featureSelectedWeight! * +item;
      else return 0;
    } else {
      return questionnaire[i].weight * +item;
    }
  });

  return logits.reduce((a, b) => a + b) + getIntercept(compactMode);
};
