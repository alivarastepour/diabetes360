import { Tilt_Neon } from "next/font/google";
import styles from "@/styles/sharedHeader.module.scss";
import Link from "next/link";
const tiltNeon = Tilt_Neon({
  subsets: ["latin"],
  weight: ["400"],
});

const SharedHeader = () => {
  return (
    <>
      <div
        data-test-id={"main-logo"}
        className={`${styles["header-logo"]} ${tiltNeon.className}`}
      >
        <Link href={"/"}>
          <span>Diabetes</span>
          <span>360</span>
        </Link>
      </div>
    </>
  );
};

export default SharedHeader;
