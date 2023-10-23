import styles from "@/styles/how.module.scss";
import { Tilt_Neon } from "next/font/google";
import { HOW_TO_PREVENT_DATA } from "./data";
import Image from "next/image";
import { useState, useEffect } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
const tiltNeon = Tilt_Neon({
  subsets: ["latin"],
  weight: ["400"],
});
const How = () => {
  const [isMedium, isLarge] = useMediaQuery({ queries: ["bg-700", "bg-1000"] });

  const [imageRect, setImageRect] = useState<{
    width: number;
    height: number;
  }>({
    width: 350,
    height: 300,
  });
  useEffect(() => {
    if (!window) return;
    document
      .querySelectorAll(`.${styles["how-slider-item-wrapper"]}`)
      .forEach((item) => {
        (item as HTMLElement).style.maxWidth = `${window.innerWidth - 12.8}px`;
      });
  }, []);

  useEffect(() => {
    // if (!isMedium) return;

    if (isLarge) {
      setImageRect({
        width: 400,
        height: 350,
      });
    } else if (isMedium) {
      setImageRect({
        width: 300,
        height: 250,
      });
    } else {
      setImageRect({
        width: 350,
        height: 300,
      });
    }
  }, [isMedium, isLarge]);

  return (
    <>
      <div className={`${tiltNeon.className} ${styles["how-wrapper"]}`}>
        <div className={styles["how-background"]}></div>
        <div className={styles["how-header"]}>
          <span>How </span> to prevent Diabetes
        </div>
        <div className={styles["how-slider-wrapper"]}>
          {HOW_TO_PREVENT_DATA.map(({ imageAddress, subText, text }) => {
            return (
              <div
                key={imageAddress}
                className={styles["how-slider-item-wrapper"]}
              >
                <div className={styles["how-image-wrapper"]}>
                  <div>
                    <Image
                      alt="a"
                      src={imageAddress}
                      width={imageRect.width}
                      height={imageRect.height}
                    />
                  </div>
                </div>
                <div className={styles["how-text-wrapper"]}>{text}</div>
                <div className={styles["how-subtext-wrapper"]}>{subText}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default How;
