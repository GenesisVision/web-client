import { ConversationInputComponent } from "components/conversation/conversation-input/conversation-input-component";
import { GVHookFormField } from "components/gv-hook-form-field";
import React from "react";

export const ConversationInput: React.FC<Props> = ({
  setFocused,
  name,
  submitForm,
  placeholder
}) => {
  return (
    <GVHookFormField
      setFocused={setFocused}
      placeholder={placeholder}
      submitForm={submitForm}
      name={name}
      component={ConversationInputComponent}
    />
  );
};

interface Props {
  setFocused?: (value: boolean) => void;
  placeholder?: string;
  submitForm: VoidFunction;
  name: string;
}
