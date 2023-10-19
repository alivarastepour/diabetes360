import styles from "@/styles/rMenu.module.scss";
import Items from "./Items";

const RMenu = () => {
  return (
    <>
      <div className={styles["r-menu-wrapper"]}>
        <Items />
      </div>
    </>
  );
};

export default RMenu;
