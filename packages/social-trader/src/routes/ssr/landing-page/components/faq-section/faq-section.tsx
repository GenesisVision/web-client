import "./faq-section.scss";

import React from "react";
import AccordionContainer from "routes/ssr/landing-page/containers/accordion-container/accordion-container";
import {
  faqAccount,
  faqFunds,
  faqGeneral,
  faqGVT,
  faqICO,
  faqInvestorAccount,
  faqManagerAccount,
  faqPrograms
} from "routes/ssr/landing-page/static-data/faq";

const FaqSection: React.FC = () => {
  return (
    <section className="faq-section">
      <div className="internal__container">
        <h1 className="faq-section__title">FAQ</h1>
        <article className="internal__article">
          <h2>General Questions</h2>
          <AccordionContainer accordions={faqGeneral} />
        </article>
        <article className="internal__article">
          <h2>Account</h2>
          <AccordionContainer accordions={faqAccount} />
        </article>
        <article className="internal__article">
          <h2>Investment programs</h2>
          <AccordionContainer accordions={faqPrograms} />
        </article>
        <article className="internal__article">
          <h2>GV Funds</h2>
          <AccordionContainer accordions={faqFunds} />
        </article>
        <article className="internal__article">
          <h2>Investor’s account</h2>
          <AccordionContainer accordions={faqInvestorAccount} />
        </article>
        <article className="internal__article">
          <h2>Manager’s account</h2>
          <AccordionContainer accordions={faqManagerAccount} />
        </article>
        <article className="internal__article">
          <h2>GVT</h2>
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
