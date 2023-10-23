import styles from "@/styles/assess.module.scss";
import { Tilt_Neon, Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
});

const tiltNeon = Tilt_Neon({
  subsets: ["latin"],
  weight: ["400"],
});
const Assess = () => {
  return (
    <>
      <div className={styles["assess-wrapper"]}>
        <div className={`${tiltNeon.className} ${styles["assess-header"]}`}>
          <span>assess </span> your risk
        </div>
        <div className={styles["assess-content-wrapper"]}>
          <div className={`${tiltNeon.className} ${styles["assess-content"]}`}>
            Artificial intelligence (AI) has revolutionized the field of
            healthcare by enhancing disease diagnosis. AI&apos;s capacity to
            analyze vast datasets, such as patient records and medical images,
            enables the early detection of diseases like cancer or diabetes. It
            offers quicker and more consistent results, reducing the risk of
            human error. Based on this technology, we have developed a test that
            can accurately assess an individual&apos;s risk for diseases,
            allowing for proactive and personalized healthcare management.
          </div>
          <div className={`${inter.className} ${styles["assess-actions"]}`}>
            <button className={styles["take"]}>
              <div className={styles["take-wrapper"]}>
                <div className={styles["take-content"]}>take the test</div>
                <div className={styles["take-icon"]}></div>
              </div>
            </button>
            <button className={styles["read"]}>
              read more about our approach
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Assess;
