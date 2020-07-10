import clsx from "clsx";
import React from "react";

import styles from "./internal.module.scss";

export const InternalMainWrapper: React.FC<{
  isSmallFont?: boolean;
}> = ({ isSmallFont, children }) => {
  return (
    <main
      className={clsx(styles["internal"], {
        [styles["internal--font-small"]]: isSmallFont
      })}
    >
      {children}
    </main>
  );
};

export const InternalContainer: React.FC = ({ children }) => {
  return <div className={styles["internal__container"]}>{children}</div>;
};

export const InternalArticle: React.FC<{
  id?: string;
  className?: string;
}> = ({ id, className, children }) => {
  return (
    <article className={clsx(styles["internal__article"], className)} id={id}>
      {children}
    </article>
  );
};

export const InternalList: React.FC<{
  list: string[];
}> = ({ list }) => {
  return (
    <ul className={styles["internal__list"]}>
      {list.map((item, index) => (
        <li key={index} className={styles["internal__list-item"]}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export const InternalTableWrapper: React.FC = ({ children }) => {
  return <table className={styles["internal__table"]}>{children}</table>;
};
