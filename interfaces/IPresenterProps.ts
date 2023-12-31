import { TSetState } from "@/types/TSetState";
import { IQuestionnaireState } from "./IQuestionnaireState";
import { IQuestion } from "./IQuestion";
import { TButtonStatus } from "@/types/TSubmitButtonStatus";
import { TErrorStatus } from "@/types/TErrorStatus";

export interface ITestPresenterProps {
  compactMode: boolean;
  setCompactMode: TSetState<boolean>;
  questionnaireState: IQuestionnaireState;
  handleInputChangeCallback: (questionId: number, newValue: number) => void;
  questionnaire: IQuestion[];
  MIN_QUESTION: number;
  MAX_QUESTION: number;
  risk: number | null;
  error: string;
}
