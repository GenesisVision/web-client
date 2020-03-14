import GVTextField from "components/gv-text-field";
import React from "react";

const ConversationInput: React.FC<Props> = ({ name = "" }) => {
  return (
    <GVTextField
      bottomLine={false}
      wide
      noMargin
      name={name}
      type={"textarea"}
    />
  );
};

interface Props {
  name?: string;
}

export default ConversationInput;
