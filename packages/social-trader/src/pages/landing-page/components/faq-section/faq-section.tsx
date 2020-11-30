import { InternalArticle } from "pages/landing-page/components/internal/internal.blocks";
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
      <div className={styles["faq-section__container"]}>
        <h1 className={styles["faq-section__title"]}>FAQ</h1>
        <InternalArticle className={styles["faq-section__article"]}>
          <h2>General Questions</h2>
          <AccordionContainer accordions={faqGeneral} />
        </InternalArticle>
        <InternalArticle className={styles["faq-section__article"]}>
          <h2>Genesis Vision Programs</h2>
          <AccordionContainer accordions={faqPrograms} />
        </InternalArticle>
        <InternalArticle className={styles["faq-section__article"]}>
          <h2>Genesis Vision Funds</h2>
          <AccordionContainer accordions={faqFunds} />
        </InternalArticle>
        <InternalArticle className={styles["faq-section__article"]}>
          <h2>Genesis Vision Follow</h2>
          <AccordionContainer accordions={faqFollow} />
        </InternalArticle>
        <InternalArticle className={styles["faq-section__article"]}>
          <h2>Genesis Vision Token</h2>
          <AccordionContainer accordions={faqGVT} />
        </InternalArticle>
        <InternalArticle className={styles["faq-section__article"]}>
          <h2>ICO</h2>
          <AccordionContainer accordions={faqICO} />
        </InternalArticle>
      </div>
    </section>
  );
};

export default FaqSection;
