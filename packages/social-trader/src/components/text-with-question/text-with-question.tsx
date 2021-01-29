import { Center } from "components/center/center";
import HelpButton from "components/help-button/help-button";
import { HORIZONTAL_POPOVER_POS, VERTICAL_POPOVER_POS } from "components/popover/popover";
import { RowItem } from "components/row-item/row-item";
import Tooltip from "components/tooltip/tooltip";
import * as React from "react";
import styled from "styled-components";
import { fontSize } from "utils/style/mixins";
import { $fontSizeCommon } from "utils/style/sizes";

interface IHelpContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  horizontal?: HORIZONTAL_POPOVER_POS;
  tooltipContent?: string | JSX.Element;
}

interface ISwitchWithQuestionProps extends IHelpContainerProps {
  label: string;
  onClickHelp?: VoidFunction;
}

const Label = styled(RowItem)`
  ${fontSize($fontSizeCommon)};
  font-weight: 600;
`;

const _SwitchWithQuestion: React.FC<ISwitchWithQuestionProps> = ({
  tooltipContent,
  onClickHelp,
  label
}) => {
  return (
    <Center>
      <RowItem size={"small"}>
        <HelpContainer tooltipContent={tooltipContent}>
          <HelpButton muted onClick={onClickHelp} />
        </HelpContainer>
      </RowItem>
      <Label size={"small"}>{label}</Label>
    </Center>
  );
};

const QuestionContainer = styled.div`
  display: flex;
`;

export const HelpContainer: React.FC<IHelpContainerProps> = ({
  horizontal = HORIZONTAL_POPOVER_POS.LEFT,
  tooltipContent,
  children
}) => {
  switch (!!tooltipContent) {
    case true:
      return (
        <Tooltip
          horizontal={horizontal}
          vertical={VERTICAL_POPOVER_POS.BOTTOM}
          render={() => tooltipContent}
        >
          <QuestionContainer>{children}</QuestionContainer>
        </Tooltip>
      );
    case false:
    default:
      return <>{children}</>;
  }
};

const TextWithQuestion = React.memo(_SwitchWithQuestion);
export default TextWithQuestion;
