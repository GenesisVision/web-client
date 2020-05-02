import AccordionContainer from "pages/landing-page/containers/accordion-container/accordion-container";
import {
  faqFollow,
  faqFunds,
  faqGeneral,
  faqGVT,
  faqICO,
  faqPrograms
} from "pages/landing-page/static-data/faq";
import React from "react";

import styles from "./faq-section.module.scss";

const FaqSection: React.FC = () => {
  return (
    <section className={styles["faq-section"]}>
      <div className="internal__container">
        <h1 className={styles["faq-section__title"]}>FAQ</h1>
        <article className="internal__article">
          <h2>General Questions</h2>
          <AccordionContainer accordions={faqGeneral} />
        </article>
        <article className="internal__article">
          <h2>Genesis Vision Program</h2>
          <AccordionContainer accordions={faqPrograms} />
        </article>
        <article className="internal__article">
          <h2>Genesis Vision Funds</h2>
          <AccordionContainer accordions={faqFunds} />
        </article>
        <article className="internal__article">
          <h2>Genesis Vision Follow</h2>
          <AccordionContainer accordions={faqFollow} />
        </article>
        <article className="internal__article">
          <h2>Genesis Vision Token</h2>
          <AccordionContainer accordions={faqGVT} />
        </article>
        <article className="internal__article">
          <h2>ICO</h2>
          <AccordionContainer accordions={faqICO} />
        </article>
      </div>
    </section>
  );
};

export default FaqSection;
