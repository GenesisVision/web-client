import { mediaBreakpointPhone } from "components/gv-styles/gv-media";
import Link, { ToType } from "components/link/link";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import React from "react";
import styled from "styled-components";

interface IDetailsDescriptionControlProps
  extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  className?: string;
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

const DetailsDescriptionControl: React.FC<IDetailsDescriptionControlProps> = ({
  children,
  text,
  className,
  onClick,
  to
}) => {
  return (
    <Link white onClick={onClick} to={to}>
      <Control>
        <TextRowItem>
          <Text color={"white"} weight={"bold"} wrap={false}>
            {text}
          </Text>
        </TextRowItem>
        {children}
      </Control>
    </Link>
  );
};

export default DetailsDescriptionControl;
