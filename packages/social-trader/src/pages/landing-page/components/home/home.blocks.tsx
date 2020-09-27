import clsx from "clsx";
import React from "react";
import LazyHydrate from "react-lazy-hydration";

import styles from "./home.module.scss";

export const HomeContainer: React.FC = ({ children }) => {
  return <div className={styles["home__container"]}>{children}</div>;
};

export const HomeSection: React.FC<HomeSectionProps> = ({
  whenVisible = true,
  children,
  id,
  bgColor,
  isFirst,
  isLast,
  hasPadding
}) => {
  return (
    <LazyHydrate whenVisible={whenVisible}>
      <section
        id={id}
        className={clsx(styles["home__section"], {
          [styles["home__section--bg-gray"]]: bgColor === "gray",
          [styles["home__section--bg-white"]]: bgColor === "white",
          [styles["home__section--first-screen"]]: isFirst,
          [styles["home__section--last-screen"]]: isLast,
          [styles["home__section--horizontal-padding"]]: hasPadding
        })}
      >
        {children}
      </section>
    </LazyHydrate>
  );
};

interface HomeSectionProps {
  whenVisible?: boolean;
  id?: string;
  bgColor?: "gray" | "white";
  isFirst?: boolean;
  isLast?: boolean;
  hasPadding?: boolean;
}
