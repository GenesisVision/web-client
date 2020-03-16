import React from "react";

export type TAccordionContent = {
  text?: string | JSX.Element;
  list?: Array<{
    text: string | JSX.Element;
  }>;
};

interface Props {
  isVisible: boolean;
  contents: TAccordionContent[];
}

const _AccordionContent: React.FC<Props> = ({ isVisible, contents }) => {
  return isVisible ? (
    <div>
      <div className="accordion__content">
        {contents.map((content, index) => (
          <div key={index}>
            {content.text && <p>{content.text}</p>}
            {content.list && (
              <ul>
                {content.list.map((item, index) => (
                  <li key={index}>{item.text}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

const AccordionContent = React.memo(_AccordionContent);
export default AccordionContent;
