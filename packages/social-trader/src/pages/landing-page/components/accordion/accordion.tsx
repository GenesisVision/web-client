import "./accordion.scss";

import classNames from "classnames";
import AccordionContent, {
  TAccordionContent
} from "pages/landing-page/components/accordion/accordion-content";
import { Arrow } from "pages/landing-page/components/common-icons/arrow";
import React, { useCallback, useEffect, useState } from "react";

export type TAccordion = {
  id: string | number;
  title: string;
  contents: TAccordionContent[];
};

interface Props {
  className?: string;
  accordion: TAccordion;
}

const _Accordion: React.FC<Props> = ({ accordion, className }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = useCallback(event => setIsVisible(!isVisible), [
    isVisible
  ]);
  return (
    <div className="accordion" id={String(accordion.id)}>
      <header className="accordion__header" onClick={handleClick}>
        <span
          className={classNames("accordion__arrow", {
            "accordion__arrow--up": isVisible
          })}
        >
          <Arrow />
        </span>
        <span className="accordion__title">{accordion.title}</span>
      </header>
      <AccordionContent contents={accordion.contents} isVisible={isVisible} />
    </div>
  );
};

const Accordion = React.memo(_Accordion);
export default Accordion;
