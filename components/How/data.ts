interface IPreventionItem {
  imageAddress: string;
  text: string;
  subText: string;
}

export const HOW_TO_PREVENT_DATA: IPreventionItem[] = [
  {
    imageAddress: "/healthy_weight.jpg",
    text: "maintain a healthy weight",
    subText:
      "Aim for a healthy body weight by managing your diet and engaging in regular physical activity. Losing excess weight can significantly reduce your risk of Type 2 diabetes.",
  },
  {
    imageAddress: "/physical_activity.avif",
    text: "Regular Physical Activity",
    subText:
      "Engage in regular exercise to help maintain a healthy weight and improve insulin sensitivity. Aim for at least 150 minutes of moderate-intensity exercise per week.",
  },
  {
    text: "Stay Hydrated",
    imageAddress: "/hydratation.avif",
    subText: "Drink plenty of water and reduce sugary beverage consumption.",
  },
  {
    imageAddress: "/sleep.avif",
    text: "Get Quality Sleep",
    subText:
      "Aim for 7-9 hours of quality sleep per night. Poor sleep patterns can contribute to insulin resistance.",
  },
  {
    imageAddress: "/healthy_diet.jpg",
    text: "Follow a Balanced Diet",
    subText:
      "Eat a well-balanced diet that includes a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats. Limit the consumption of sugary foods and drinks, as well as foods high in refined carbohydrates",
  },
  {
    imageAddress: "/no_smoke.png",
    text: "Avoid Smoking",
    subText:
      "Smoking is a risk factor for Type 2 diabetes. If you smoke, seek help to quit.",
  },
  {
    imageAddress: "/no_suger.jpg",
    text: "Reduce Sugar Intake",
    subText:
      "Minimize your consumption of added sugars and sugary beverages. Read food labels to identify hidden sugars.",
  },
];
