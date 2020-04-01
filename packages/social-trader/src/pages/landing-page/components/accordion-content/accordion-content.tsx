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
      <div className="accordion__content">
        {content}
        {/*{contents.map((content, index) => (*/}
        {/*  <div key={index}>*/}
        {/*    {content.element && content.element}*/}
        {/*    {content.text && <p>{content.text}</p>}*/}
        {/*    {content.list && (*/}
        {/*      <ul>*/}
        {/*        {content.list.map((item, index) => (*/}
        {/*          <li key={index}>{item.text}</li>*/}
        {/*        ))}*/}
        {/*      </ul>*/}
        {/*    )}*/}
        {/*  </div>*/}
        {/*))}*/}
      </div>
    </div>
  ) : null;
};

const AccordionContent = React.memo(_AccordionContent);
export default AccordionContent;
