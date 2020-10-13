import Link, { ToType } from "components/link/link";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import React from "react";
import styled from "styled-components";
import { mediaBreakpointPhone } from "utils/style/media";

interface IDetailsDescriptionControlProps
  extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  onClick?: VoidFunction;
  to?: ToType;
}

const TextRowItem = styled(RowItem)`
  display: none;
  ${mediaBreakpointPhone(`display: inherit;`)}
`;

const Control = styled(Row)`
  justify-content: flex-end;
`;

export const DetailsDescriptionControlButton: React.FC<{
  text?: string;
}> = ({ children, text }) => {
  return (
    <Control>
      <TextRowItem>
        <Text color={"white"} weight={"bold"} wrap={false}>
          {text}
        </Text>
      </TextRowItem>
      {children}
    </Control>
  );
};

const DetailsDescriptionControl: React.FC<IDetailsDescriptionControlProps> = ({
  children,
  text,
  onClick,
  to
}) => {
  return (
    <Link white onClick={onClick} to={to}>
      <DetailsDescriptionControlButton text={text}>
        {children}
      </DetailsDescriptionControlButton>
    </Link>
  );
};

export default DetailsDescriptionControl;
