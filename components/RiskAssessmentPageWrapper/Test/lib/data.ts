import { IQuestion } from "@/interfaces/IQuestion";

export const questionnaire: IQuestion[] = [
  {
    id: 0,
    question: "Are you diagnosed with high blood pressure?",
    correspondingColumn: "HighBP",
    options: [{ 1: "Yes I am." }, { 0: "No, I'm not." }],
    featureSelected: true,
    weight: 0.3725784485858579,
    featureSelectedWeight: 0.3901271821015576,
  },
  {
    id: 1,
    question: "Are you diagnosed with high cholesterol?",
    correspondingColumn: "HighChol",
    options: [{ 1: "Yes I am." }, { 0: "No, I'm not." }],
    featureSelected: true,
    weight: 0.28995716475599387,
    featureSelectedWeight: 0.2992304239683523,
  },
  {
    id: 2,
    question: "Have you checked your cholesterol in the past 5 years?",
    correspondingColumn: "CholCheck",
    options: [{ 1: "Yes I have." }, { 0: "No, I havn't." }],
    featureSelected: false,
    weight: 0.6690995411991598,
  },
  {
    id: 3,
    question: "What is your BMI(body mass index)?",
    correspondingColumn: "BMI",
    options: "numberInput",
    placeHolder: "enter your BMI.",
    featureSelected: true,
    weight: 0.03689709512582953,
    featureSelectedWeight: 0.037820453841007684,
    min: 0,
  },
  {
    id: 4,
    question:
      "Have you smoked at least 100 cigarettes in your entire life? [5 packs = 100 cigarettes]",
    correspondingColumn: "Smoker",
    options: [{ 0: "No, I havn't." }, { 1: "Yes I have." }],
    featureSelected: false,
    weight: -0.0024967756625987555,
  },
  {
    id: 5,
    question: "Have you ever had a stroke?",
    correspondingColumn: "Stroke",
    options: [{ 0: "No, I havn't." }, { 1: "Yes I have." }],
    featureSelected: false,
    weight: 0.09599408484685666,
  },
  {
    id: 6,
    question:
      "Do you have a history of coronary heart disease (CHD) or myocardial infarction (MI)?",
    correspondingColumn: "HeartDiseaseorAttack",
    options: [{ 0: "No, I don't." }, { 1: "Yes I do." }],
    featureSelected: false,
    weight: 0.1182362347235588,
  },
  {
    id: 7,
    question:
      "Have you had physical activity in past 30 days?(not including job)",
    correspondingColumn: "PhysActivity",
    options: [{ 0: "No, I havn't." }, { 1: "Yes I have." }],
    featureSelected: false,
    weight: -0.0156523589547063,
  },
  {
    id: 8,
    question: "Do you consume fruit 1 or more times per day?",
    correspondingColumn: "Fruits",
    options: [{ 0: "No, I don't." }, { 1: "Yes I do." }],
    featureSelected: false,
    weight: -0.01979998235903014,
  },
  {
    id: 9,
    question: "Do you consume vegetables 1 or more times per day?",
    correspondingColumn: "Veggies",
    options: [{ 0: "No, I don't." }, { 1: "Yes I do." }],
    featureSelected: false,
    weight: -0.05413245195889239,
  },
  {
    id: 10,
    question:
      "Are you a heavy alcohol consumer?(adult men >=14 drinks per week and adult women>=7 drinks per week)",
    correspondingColumn: "HvyAlcoholConsump",
    options: [{ 0: "No, I am not." }, { 1: "Yes I am." }],
    featureSelected: false,
    weight: -0.37604701089690423,
  },
  {
    id: 11,
    question:
      "Do you have any kind of health care coverage, including health insurance?",
    correspondingColumn: "AnyHealthcare",
    options: [{ 0: "No, I don't." }, { 1: "Yes I do." }],
    featureSelected: false,
    weight: 0.006265310336406544,
  },
  {
    id: 12,
    question:
      "Was there a time in the past 12 months when you needed to see a doctor but could not because of cost?",
    correspondingColumn: "NoDocbcCost",
    options: [{ 0: "No, there wasn't." }, { 1: "Yes there was." }],
    featureSelected: false,
    weight: 0.027911190748329033,
  },
  {
    id: 13,
    question:
      "How would you rate your own general health on a scale of 1 to 5?",
    correspondingColumn: "GenHlth",
    options: [
      { 1: "Excellent" },
      { 2: "Very good" },
      { 3: "Good" },
      { 4: "Fair" },
      { 5: "Poor" },
    ],
    featureSelected: true,
    weight: 0.3008612073840079,
    featureSelectedWeight: 0.3006784742059559,
  },
  {
    id: 14,
    question:
      "How many days were you in poor mental health in the past 30 days?",
    correspondingColumn: "MentHlth",
    options: "numberInput",
    placeHolder: "enter a number between 0 and 30.",
    featureSelected: false,
    weight: -0.0021474946482711726,
    min: 0,
    max: 30,
  },
  {
    id: 15,
    question:
      "How many days were you in poor physical health(illness or injury) in the past 30 days?",
    correspondingColumn: "PhysHlth",
    options: "numberInput",
    placeHolder: "enter a number between 0 and 30.",
    featureSelected: false,
    weight: -0.0039002860795859288,
    min: 0,
    max: 30,
  },
  {
    id: 16,
    question: "Do you have serious difficulty walking or climbing stairs?",
    correspondingColumn: "DiffWalk",
    options: [{ 0: "No, I don't." }, { 1: "Yes I do." }],
    featureSelected: true,
    weight: 0.08630184175698989,
    featureSelectedWeight: 0.07021860307767065,
  },
  {
    id: 17,
    question: "What is your gender?",
    correspondingColumn: "Sex",
    options: [{ 0: "Female" }, { 1: "Male" }],
    featureSelected: false,
    weight: 0.11340986630298597,
  },
  {
    id: 18,
    question: "How old are you?",
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
    weight: 0.07794294636864775,
    featureSelectedWeight: 0.08500236683792137,
  },
  {
    id: 19,
    question: "what is your education level?",
    correspondingColumn: "Education",
    options: [
      { 1: "Never attended school" },
      { 2: "elementary" },
      { 3: "high school" },
      { 4: "high school graduate" },
      { 5: "college(1 to 3 years)" },
      { 6: "college(more than 4 years)" },
    ],
    featureSelected: false,
    weight: -0.033936944653534966,
  },
];

export const comapctQuestionnaire = questionnaire.filter(
  (item) => item.featureSelected
);

export const INTERCEPT = -3.48803218;
export const COMPACT_MODE_INTERCEPT = -3.12548995;
export const MAX_VIEW_WIDTH = 100;
export const CONTAINER_PADDING = 0.8; //rem
export const TEST_RESULT_CONTENT = {
  "very-low": "You are in a good shape! keep it up.",
  low: "You have a low risk. Don't forget periodic check-ups.",
  moderate: "You may be at risk. Consult a doctor.",
  "at-risk": "You are at risk. Seek medical help immediately.",
};
