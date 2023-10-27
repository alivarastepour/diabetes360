import styles from "@/styles/hMenu.module.scss";

import Items from "./Items";

const HMenu = () => {
  return (
    <>
      <div
        data-test-id={"hamburger-menu-content"}
        className={styles["h-menu-wrapper"]}
      >
        <Items isSmall={true} />
      </div>
    </>
  );
};

export default HMenu;
