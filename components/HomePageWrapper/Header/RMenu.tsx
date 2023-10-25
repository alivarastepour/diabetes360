import styles from "@/styles/rMenu.module.scss";

import Items from "./Items";

const RMenu = () => {
  return (
    <>
      <div className={styles["r-menu-wrapper"]}>
        <Items isSmall={false} />
      </div>
    </>
  );
};

export default RMenu;
