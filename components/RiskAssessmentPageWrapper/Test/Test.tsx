import styles from "@/styles/test.module.scss";
import { questionnaire } from "./data";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "300"],
});
const Test = () => {
  return (
    <>
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
            <div key={id} className={styles["question-wrapper"]}>
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
    </>
  );
};

export default Test;
