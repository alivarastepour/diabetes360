import styles from "@/styles/what.module.scss";
import { Tilt_Neon } from "next/font/google";
import Image from "next/image";
const titltNeon = Tilt_Neon({
  subsets: ["latin"],
  weight: ["400"],
});
const What = () => {
  return (
    <>
      <div className={`${titltNeon.className} ${styles["what-wrapper"]}`}>
        <div className={styles["what-header"]}>
          <span>what </span>
          is diabetes
        </div>
        <div className={styles["what-content"]}>
          Diabetes is a chronic medical condition that affects how your body
          regulates blood sugar (glucose), which is the primary source of energy
          for your cells. There are several types of diabetes, but the two most
          common are type 1 and type 2. Type 1 Diabetes is an autoimmune
          condition in which the body&apos;s immune system mistakenly attacks
          and destroys the insulin-producing beta cells in the pancreas. Type 2
          Diabetes is the most common form of diabetes and is often associated
          with lifestyle and genetic factors. In Type 2 diabetes, the body
          doesn&apos;t use insulin properly (insulin resistance), and over time,
          the pancreas may not produce enough insulin. This leads to elevated
          blood sugar levels.
        </div>
        <div className={styles["i"]}>
          <Image alt="a" src={"/w.webp"} width={600} height={500} />
        </div>
      </div>
    </>
  );
};

export default What;
