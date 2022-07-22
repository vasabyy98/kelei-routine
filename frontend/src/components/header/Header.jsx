import React from "react";

import styles from "./header.module.css";

function Header(props) {
  return (
    <header className={styles.header__4}>
      {Object.keys(props).map((key, index) => (
        <div key={key + index} className={styles.header__row}>
          <span className={styles.header__text}>{props[key]}</span>
        </div>
      ))}
    </header>
  );
}

export default Header;
