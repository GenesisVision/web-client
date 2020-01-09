import React from "react";
import Accordion, {
  TAccordion
} from "routes/ssr/landing-page/components/accordion/accordion";

interface Props {
  accordions: TAccordion[];
}

const _AccordionContainer: React.FC<Props> = ({ accordions }) => {
  return (
    <>
      {accordions.map(accordion => (
        <Accordion accordion={accordion} key={accordion.id} />
      ))}
    </>
  );
};

const AccordionContainer = React.memo(_AccordionContainer);
export default AccordionContainer;
