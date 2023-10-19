import styles from "@/styles/header.items.module.scss";

const Items = ({ isSmall }: { isSmall: boolean }) => {
  return (
    <>
      <div className={styles["header-item"]}>what</div>
      <div className={styles["header-item"]}>when</div>
      <div className={styles["header-item"]}>how</div>
      <div
        className={`${!isSmall && styles["action-item"]} ${
          styles["header-item"]
        }`}
      >
        diagnose
      </div>
    </>
  );
};

export default Items;
