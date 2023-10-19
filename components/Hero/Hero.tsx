import styles from "@/styles/hero.module.scss";
import { Tilt_Neon } from "next/font/google";
import Typewriter from "typewriter-effect";
const titltNeon = Tilt_Neon({
  subsets: ["latin"],
  weight: ["400"],
});

const Hero = () => {
  return (
    <>
      <div className={`${titltNeon.className} ${styles["hero-wrapper"]}`}>
        <div className={styles["hero-background"]}></div>
        <div className={styles["hero-content"]}>
          <span className={styles["header"]}>Diabetes360,</span>
          <span className={styles["middle"]}>where you know</span>
          <span className={styles["changing-content"]}>
            <Typewriter
              options={{
                strings: [
                  "what diabetes is.",
                  "how to prevent diabetes.",
                  "what are the causes of diabetes.",
                  "what are the symptoms of diabetes.",
                  "if you are prone to diabetes.",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;
