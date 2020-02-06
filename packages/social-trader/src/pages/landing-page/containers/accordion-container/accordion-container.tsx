import Accordion, {
  TAccordion
} from "pages/landing-page/components/accordion/accordion";
import React from "react";

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
