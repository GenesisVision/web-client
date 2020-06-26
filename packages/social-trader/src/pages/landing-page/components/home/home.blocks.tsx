import classNames from "classnames";
import React from "react";

import styles from "./home.module.scss";

export const HomeContainer: React.FC = ({ children }) => {
  return <div className={styles["home__container"]}>{children}</div>;
};

export const HomeSection: React.FC<HomeSectionProps> = ({
  children,
  id,
  bgColor,
  isFirst,
  isLast,
  hasPadding
}) => {
  return (
    <section
      id={id}
      className={classNames(styles["home__section"], {
        [styles["home__section--bg-gray"]]: bgColor === "gray",
        [styles["home__section--bg-white"]]: bgColor === "white",
        [styles["home__section--first-screen"]]: isFirst,
        [styles["home__section--last-screen"]]: isLast,
        [styles["home__section--horizontal-padding"]]: hasPadding
      })}
    >
      {children}
    </section>
  );
};

interface HomeSectionProps {
  id?: string;
  bgColor?: "gray" | "white";
  isFirst?: boolean;
  isLast?: boolean;
  hasPadding?: boolean;
}
