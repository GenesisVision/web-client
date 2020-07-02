import { Center } from "components/center/center";
import GVSwitch from "components/gv-switch";
import { RowItem } from "components/row-item/row-item";
import TextWithQuestion from "components/text-with-question/text-with-question";
import * as React from "react";

const _SwitchWithQuestion: React.FC<Props> = ({
  tooltipContent,
  onChange,
  value,
  onClickHelp,
  name,
  label,
  isPending
}) => {
  return (
    <Center>
      <RowItem size={"small"}>
        <TextWithQuestion
          label={label}
          onClickHelp={onClickHelp}
          tooltipContent={tooltipContent}
        />
      </RowItem>
      {value !== undefined && (
        <GVSwitch
          touched={false}
          name={name}
          value={value}
          disabled={isPending}
          color="primary"
          onChange={onChange}
        />
      )}
    </Center>
  );
};

interface Props {
  onChange: VoidFunction;
  value: boolean;
  label: string;
  isPending: boolean;
  name?: string;
  onClickHelp?: VoidFunction;
  tooltipContent?: string | JSX.Element;
}

const SwitchWithQuestion = React.memo(_SwitchWithQuestion);
export default SwitchWithQuestion;
