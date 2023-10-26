type TOption = { [index: number]: string };
interface IQuestion {
  id: number;
  question: string;
  correspondingColumn: string;
  options: TOption[] | "numberInput";
  featureSelected: boolean;
}

export const questionnaire: IQuestion[] = [
  {
    id: 0,
    question: "are you diagnosed with high blood pressure?",
    correspondingColumn: "HighBP",
    options: [{ 0: "no high BP" }, { 1: "high BP" }],
    featureSelected: true,
  },
  {
    id: 1,
    question: "are you diagnosed with high cholesterol?",
    correspondingColumn: "HighChol",
    options: [{ 0: "no high cholesterol" }, { 1: "high cholesterol" }],
    featureSelected: true,
  },
  {
    id: 2,
    question: "have you checked your cholesterol in the past 5 years?",
    correspondingColumn: "CholCheck",
    options: [
      { 0: "no cholesterol check in 5 years" },
      { 1: "cholesterol check in 5 years" },
    ],
    featureSelected: false,
  },
  {
    id: 3,
    question: "what is your BMI(body mass index)?",
    correspondingColumn: "BMI",
    options: "numberInput",
    featureSelected: true,
  },
  {
    id: 4,
    question:
      "have you smoked at least 100 cigarettes in your entire life? [5 packs = 100 cigarettes]",
    correspondingColumn: "Smoker",
    options: [{ 0: "no i havn't" }, { 1: "yes i have" }],
    featureSelected: false,
  },
  {
    id: 5,
    question: "have you ever had a stroke?",
    correspondingColumn: "Stroke",
    options: [{ 0: "no i havn't" }, { 1: "yes i have" }],
    featureSelected: false,
  },
  {
    id: 6,
    question:
      "do you have a history of coronary heart disease (CHD) or myocardial infarction (MI)?",
    correspondingColumn: "HeartDiseaseorAttack",
    options: [{ 0: "no i havn't" }, { 1: "yes i have" }],
    featureSelected: false,
  },
  {
    id: 7,
    question:
      "have you had physical activity in past 30 days?(not including job)",
    correspondingColumn: "PhysActivity",
    options: [{ 0: "no i havn't" }, { 1: "yes i have" }],
    featureSelected: false,
  },
  {
    id: 8,
    question: "do you consume fruit 1 or more times per day?",
    correspondingColumn: "Fruits",
    options: [{ 0: "no i don't" }, { 1: "yes i do" }],
    featureSelected: false,
  },
  {
    id: 9,
    question: "do you consume vegetables 1 or more times per day?",
    correspondingColumn: "Veggies",
    options: [{ 0: "no i don't" }, { 1: "yes i do" }],
    featureSelected: false,
  },
  {
    id: 10,
    question:
      "are you a heavy alcohol consumer?(adult men >=14 drinks per week and adult women>=7 drinks per week)",
    correspondingColumn: "HvyAlcoholConsump",
    options: [{ 0: "no i am not" }, { 1: "yes i am" }],
    featureSelected: false,
  },
  {
    id: 11,
    question:
      "do you have any kind of health care coverage, including health insurance?",
    correspondingColumn: "AnyHealthcare",
    options: [{ 0: "no i don't" }, { 1: "yes i do" }],
    featureSelected: false,
  },
  {
    id: 12,
    question:
      "was there a time in the past 12 months when you needed to see a doctor but could not because of cost?",
    correspondingColumn: "NoDocbcCost",
    options: [{ 0: "no there wasn't" }, { 1: "yes there was" }],
    featureSelected: false,
  },
  {
    id: 13,
    question:
      "how would you rate your own general health on a scale of 1 to 5?",
    correspondingColumn: "GenHlth",
    options: [
      { 1: "excellent" },
      { 2: "very good" },
      { 3: "good" },
      { 4: "fair" },
      { 5: "poor" },
    ],
    featureSelected: true,
  },
  {
    id: 14,
    question:
      "how many days were you in poor mental health in the past 30 days?",
    correspondingColumn: "MentHlth",
    options: "numberInput",
    featureSelected: false,
  },
  {
    id: 15,
    question:
      "how many days were you in poor physical health(illness or injury) in the past 30 days?",
    correspondingColumn: "PhysHlth",
    options: "numberInput",
    featureSelected: false,
  },
  {
    id: 16,
    question: "do you have serious difficulty walking or climbing stairs?",
    correspondingColumn: "DiffWalk",
    options: [{ 0: "no i don't" }, { 1: "yes i do" }],
    featureSelected: true,
  },
  {
    id: 17,
    question: "what is your gender?",
    correspondingColumn: "Sex",
    options: [{ 0: "female" }, { 1: "male" }],
    featureSelected: false,
  },
  {
    id: 18,
    question: "how old are you?",
    correspondingColumn: "Age",
    options: [
      { 1: "18-24" },
      { 2: "25-29" },
      { 3: "30-34" },
      { 4: "35-39" },
      { 5: "40-44" },
      { 6: "45-49" },
      { 7: "50-54" },
      { 8: "55-59" },
      { 9: "60-64" },
      { 10: "65-69" },
      { 11: "70-74" },
      { 12: "75-79" },
      { 13: ">80" },
    ],
    featureSelected: true,
  },
  {
    id: 19,
    question: "what is your education level?",
    correspondingColumn: "Education",
    options: [
      { 1: "Never attended school or only kindergarten" },
      { 2: "elementary" },
      { 3: "high school" },
      { 4: "high school graduate" },
      { 5: "college(1 to 3 years)" },
      { 6: "college(more than 4 years)" },
    ],
    featureSelected: false,
  },
];

export const MAX_QUESTION = questionnaire.length - 1;
export const MIN_QUESTION = questionnaire[0].id;
