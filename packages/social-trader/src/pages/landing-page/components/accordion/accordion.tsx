import { useNetworkStatusInWindow } from "hooks/network-status";
import dynamic from "next/dynamic";
import AccordionContent from "pages/landing-page/components/accordion-content/accordion-content";
import { Arrow } from "pages/landing-page/components/common-icons/arrow";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { $rowColor } from "utils/style/colors";
import {
  mediaBreakpointDesktop,
  mediaBreakpointLandscapeTablet,
  mediaBreakpointLargeDesktop,
  mediaBreakpointTablet
} from "utils/style/media";
import { transition } from "utils/style/mixins";

const AccordionContentWithAnimation = dynamic(
  () =>
    import(
      "pages/landing-page/components/accordion-content/accordion-content-with-animation"
    )
);

export type TAccordion = {
  id: string | number;
  title: string;
  content: React.ReactElement;
};

interface Props {
  accordion: TAccordion;
}

const Header = styled.header`
  ${transition("opacity")};
  font-weight: 600;
  font-size: 20px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  padding-top: 10px;
  padding-bottom: 10px;

  ${mediaBreakpointTablet(`
    font-size: 24px;
  `)};
  ${mediaBreakpointLandscapeTablet(`
    font-size: 20px;
  `)};
  ${mediaBreakpointDesktop(`
    padding-top: 15px;
    padding-bottom: 15px;

    &:hover {
      opacity: 0.7;
    }
  `)};
  ${mediaBreakpointLargeDesktop(`
    font-size: 22px;
  `)};
`;

const ArrowButton = styled.span<{ up?: boolean }>`
  ${transition("transform")};
  display: inline-block;
  transform: rotate(${({ up }) => (up ? 270 : 90)}deg);
  margin-right: 10px;

  svg {
    stroke: ${$rowColor};
  }
`;

const _Accordion: React.FC<Props> = ({ accordion }) => {
  const { effectiveConnectionType } = useNetworkStatusInWindow();
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = useCallback(() => setIsVisible(!isVisible), [isVisible]);

  const renderAccordionContent = useCallback(() => {
    switch (effectiveConnectionType) {
      case "4g":
        return (
          <AccordionContentWithAnimation isVisible={isVisible}>
            {accordion.content}
          </AccordionContentWithAnimation>
        );
      default:
        return (
          <AccordionContent isVisible={isVisible}>
            {accordion.content}
          </AccordionContent>
        );
    }
  }, [effectiveConnectionType, isVisible]);

  return (
    <div id={String(accordion.id)}>
      <Header onClick={handleClick}>
        <ArrowButton up={isVisible}>
          <Arrow />
        </ArrowButton>
        <span>{accordion.title}</span>
      </Header>
      {renderAccordionContent()}
    </div>
  );
};

const Accordion = React.memo(_Accordion);
export default Accordion;
