import React from "react";

export type TAccordionContent = {
  element?: JSX.Element;
  text?: string | JSX.Element;
  list?: Array<{
    text: string | JSX.Element;
  }>;
};

interface Props {
  isVisible: boolean;
  content?: JSX.Element;
  contents?: TAccordionContent[];
}

const _AccordionContent: React.FC<Props> = ({ isVisible, content }) => {
  return isVisible ? (
    <div>
      <div className="accordion__content">{content}</div>
    </div>
  ) : null;
};

const AccordionContent = React.memo(_AccordionContent);
export default AccordionContent;
