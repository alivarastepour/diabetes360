import { useState, useEffect } from "react";
import { Tilt_Neon } from "next/font/google";
import Image from "next/image";

import useMediaQuery from "@/hooks/useMediaQuery";

import styles from "@/styles/how.module.scss";

import { HOW_TO_PREVENT_DATA } from "./data";

import { IImageRect } from "@/interfaces/IImageRect";

const tiltNeon = Tilt_Neon({
  subsets: ["latin"],
  weight: ["400"],
});

const How = () => {
  const [isMedium, isLarge] = useMediaQuery({ queries: ["bg-700", "bg-1000"] });
  const [imageRect, setImageRect] = useState<IImageRect>({
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
    const newImageRect: IImageRect = {
      height: isLarge ? 350 : isMedium ? 250 : 300,
      width: isLarge ? 400 : isMedium ? 300 : 350,
    };
    setImageRect(newImageRect);
  }, [isMedium, isLarge]);

  return (
    <>
      <div className={`${tiltNeon.className} ${styles["how-wrapper"]}`}>
        <div className={styles["how-background"]}></div>
        <div id="how-header" className={styles["how-header"]}>
          <span>How </span> to prevent Diabetes
        </div>
        <div
          className={styles["how-slider-wrapper"]}
          data-test-id={"how-slider-wrapper"}
        >
          {HOW_TO_PREVENT_DATA.map(({ imageAddress, subText, text, alt }) => {
            return (
              <div
                key={imageAddress}
                className={styles["how-slider-item-wrapper"]}
              >
                <div className={styles["how-image-wrapper"]}>
                  <div>
                    <Image
                      alt={alt}
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
