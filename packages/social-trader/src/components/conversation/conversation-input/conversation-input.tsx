import { ConversationInputComponent } from "components/conversation/conversation-input/conversation-input-component";
import { GVHookFormField } from "components/gv-hook-form-field";
import React from "react";

export const ConversationInput: React.FC<Props> = ({
  name,
  submitForm,
  placeholder
}) => {
  return (
    <GVHookFormField
      placeholder={placeholder}
      submitForm={submitForm}
      name={name}
      component={ConversationInputComponent}
    />
  );
};

interface Props {
  placeholder?: string;
  submitForm: VoidFunction;
  name: string;
}
