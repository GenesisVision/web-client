import React from "react";

interface Props {
  isVisible: boolean;
  content?: JSX.Element;
}

const _AccordionContent: React.FC<Props> = ({ isVisible, content }) => {
  return isVisible ? <div className="accordion__content">{content}</div> : null;
};

const AccordionContent = React.memo(_AccordionContent);
export default AccordionContent;
