import classNames from "classnames";
import { AdvantagesListContainer } from "pages/landing-page/components/advantages-section/advantages.blocks";
import React from "react";

import styles from "./advantages-section.module.scss";

const AdvantagesSection: React.FC = () => {
  return (
    <section className="home__section home__section--bg-white">
      <AdvantagesListContainer />
    </section>
  );
};

export default AdvantagesSection;
