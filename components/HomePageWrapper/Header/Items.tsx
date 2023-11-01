import styles from "@/styles/header.items.module.scss";
import Link from "next/link";

const Items = ({ isSmall }: { isSmall: boolean }) => {
  return (
    <>
      <div className={styles["header-item"]}>
        <Link href={"#what-header"}>what</Link>
      </div>
      <div className={styles["header-item"]}>
        <Link href={"#how-header"}>how</Link>
      </div>
      <div
        className={`${!isSmall && styles["action-item"]} ${
          styles["header-item"]
        }`}
      >
        <Link href={"#assess-header"}>assess</Link>
      </div>
    </>
  );
};

export default Items;
