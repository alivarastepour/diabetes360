import SharedHeader from "@/components/shared/Header";
import styles from "@/styles/riskAssessmentHeader.module.scss";
import { Tilt_Neon } from "next/font/google";
const tiltNeon = Tilt_Neon({
  subsets: ["latin"],
  weight: ["400"],
});
const Header = () => {
  return (
    <>
      <div className={`${tiltNeon.className} ${styles["header-wrapper"]}`}>
        <SharedHeader />
        <div className={styles["header-content"]}>
          <span>Risk </span>
          <span>Assessment</span>
        </div>
      </div>
    </>
  );
};
export default Header;
