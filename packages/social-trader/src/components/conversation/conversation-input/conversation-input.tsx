import { ConversationInputComponent } from "components/conversation/conversation-input/conversation-input-component";
import { GVHookFormField } from "components/gv-hook-form-field";
import React from "react";

interface Props {
  focusTrigger?: any;
  onPaste?: VoidFunction;
  autoFocus?: boolean;
  bottomLine?: boolean;
  disabled?: boolean;
  outerCaret?: number;
  onChangeCaret?: (position: number) => void;
  setFocused?: (value: boolean) => void;
  placeholder?: string;
  submitForm: VoidFunction;
  name: string;
}

export const ConversationInput: React.FC<Props> = props => {
  return <GVHookFormField {...props} component={ConversationInputComponent} />;
};
