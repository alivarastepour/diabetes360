import useMediaQuery from "@/hooks/useMediaQuery";
import styles from "@/styles/assess.module.scss";
import { Tilt_Neon, Montserrat } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
});

const titltNeon = Tilt_Neon({
  subsets: ["latin"],
  weight: ["400"],
});
const Assess = () => {
  const [isLarge] = useMediaQuery({ queries: ["bg-1100"] });
  const [imageRect, setImageRect] = useState({ width: 300, height: 400 });

  useEffect(() => {
    const newImageRect = {
      height: isLarge ? 500 : 400,
      width: isLarge ? 400 : 300,
    };
    setImageRect(newImageRect);
  }, [isLarge]);

  return (
    <>
      <div className={styles["assess-wrapper"]}>
        <div className={styles["assess-background"]}></div>
        <div className={`${titltNeon.className} ${styles["assess-header"]}`}>
          <span>Assess </span> your risk
        </div>
        <div className={styles["assess-content-wrapper"]}>
          <div className={`${styles["assess-content"]} ${titltNeon.className}`}>
            Artificial intelligence (AI) has revolutionized the field of
            healthcare by enhancing disease diagnosis. AI&apos;s capacity to
            analyze vast datasets, such as patient records and medical images,
            enables the early detection of diseases like cancer or diabetes. It
            offers quicker and more consistent results, reducing the risk of
            human error. Based on this technology, we have developed a test that
            can accurately assess an individual&apos;s risk for diseases,
            allowing for proactive and personalized healthcare management.
            It&apos;s worth noting that test results should undergo technical
            supervision to ensure more accurate diagnoses.
          </div>
          <div className={styles["medical-test"]}>
            <Image
              alt="A"
              src={"/medical_test.jpg"}
              width={imageRect.width}
              height={imageRect.height}
            />
          </div>
        </div>
        <div className={`${styles["assess-actions"]}`}>
          <button className={styles["take"]}>
            <div className={styles["take-wrapper"]}>
              <div
                className={`${montserrat.className} ${styles["take-content"]}`}
              >
                take the test
              </div>
              <div className={styles["take-icon"]}></div>
            </div>
          </button>
          <button className={`${montserrat.className} ${styles["read"]}`}>
            read more about our approach
          </button>
        </div>
      </div>
    </>
  );
};

export default Assess;
