import clsx from "clsx";
import { useNetworkStatusInWindow } from "hooks/network-status";
import dynamic from "next/dynamic";
import AccordionContent from "pages/landing-page/components/accordion-content/accordion-content";
import { Arrow } from "pages/landing-page/components/common-icons/arrow";
import React, { useCallback, useState } from "react";

import styles from "./accordion.module.scss";

const AccordionContentWithAnimation = dynamic(() =>
  import(
    "pages/landing-page/components/accordion-content/accordion-content-with-animation"
  )
);

export type TAccordion = {
  id: string | number;
  title: string;
  content?: JSX.Element;
};

interface Props {
  className?: string;
  accordion: TAccordion;
}

const _Accordion: React.FC<Props> = ({ accordion, className }) => {
  const { effectiveConnectionType } = useNetworkStatusInWindow();
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = useCallback(() => setIsVisible(!isVisible), [isVisible]);

  const renderAccordionContent = useCallback(() => {
    switch (effectiveConnectionType) {
      case "4g":
        return (
          <AccordionContentWithAnimation
            content={accordion.content}
            isVisible={isVisible}
          />
        );
      default:
        return (
          <AccordionContent content={accordion.content} isVisible={isVisible} />
        );
    }
  }, [effectiveConnectionType, isVisible]);

  return (
    <div className={styles["accordion"]} id={String(accordion.id)}>
      <header className={styles["accordion__header"]} onClick={handleClick}>
        <span
          className={clsx(styles["accordion__arrow"], {
            [styles["accordion__arrow--up"]]: isVisible
          })}
        >
          <Arrow />
        </span>
        <span className={styles["accordion__title"]}>{accordion.title}</span>
      </header>
      {renderAccordionContent()}
    </div>
  );
};

const Accordion = React.memo(_Accordion);
export default Accordion;
