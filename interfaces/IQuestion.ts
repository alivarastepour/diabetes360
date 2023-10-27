import { TOption } from "@/types/TOption";

export interface IQuestion {
  id: number;
  question: string;
  correspondingColumn: string;
  options: TOption[] | "numberInput";
  placeHolder?: string;
  weight: number;
  featureSelectedWeight?: number;
  featureSelected: boolean;
}
