import styles from "@/styles/how.module.scss";
import { Tilt_Neon } from "next/font/google";
import { HOW_TO_PREVENT_DATA } from "./data";
import Image from "next/image";
import { useState, useEffect } from "react";
const tiltNeon = Tilt_Neon({
  subsets: ["latin"],
  weight: ["400"],
});
const How = () => {
  useEffect(() => {
    if (!window) return;
    document
      .querySelectorAll(`.${styles["how-slider-item-wrapper"]}`)
      .forEach((item) => {
        (item as HTMLElement).style.maxWidth = `${window.innerWidth - 12.8}px`;
      });
  }, []);

  return (
    <>
      <div className={`${tiltNeon.className} ${styles["how-wrapper"]}`}>
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
                  <Image alt="a" src={imageAddress} width={350} height={300} />
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
