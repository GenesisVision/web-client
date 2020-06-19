import { CONVERSATION_SUBMIT_TYPE } from "components/conversation/conversation-input/conversation-input.helpers";
import GVTextField from "components/gv-text-field";
import {
  TextareaChangeEvent,
  TextareaKeyDownEventExtended
} from "components/gv-text-field/gv-text-area";
import React, { useCallback } from "react";

interface Props {
  onPaste?: VoidFunction;
  bottomLine?: boolean;
  setFocused?: (value: boolean) => void;
  submitType?: CONVERSATION_SUBMIT_TYPE;
  submitForm: VoidFunction;
  value: string;
  setFieldValue: Function;
  name: string;
}

export const ConversationInputComponent: React.FC<Props> = ({
  onPaste,
  bottomLine = false,
  setFocused,
  submitType = CONVERSATION_SUBMIT_TYPE.ENTER,
  submitForm,
  name,
  setFieldValue,
  value,
  ...props
}) => {
  const handleOnFocus = useCallback(() => {
    if (setFocused) setFocused(true);
  }, [setFocused]);
  const handleOnBlur = useCallback(() => {
    if (setFocused) setFocused(false);
  }, [setFocused]);

  const handleKeyDown = useCallback(
    (event: TextareaKeyDownEventExtended) => {
      const {
        shiftKey,
        keyCode,
        metaKey,
        ctrlKey,
        ref,
        preventDefault
      } = event;
      const ctrl = shiftKey || ctrlKey || metaKey;
      if (keyCode === 13) {
        if (ctrl && submitType === CONVERSATION_SUBMIT_TYPE.ENTER) {
          const position = ref.selectionEnd;
          const newValue =
            value.slice(0, position) + "\n" + value.slice(position);
          setFieldValue(name, newValue, true);
          setTimeout(() => {
            ref.selectionEnd = position + 1;
          });
        } else if (ctrl || submitType === CONVERSATION_SUBMIT_TYPE.ENTER) {
          preventDefault();
          submitForm();
        }
      }
    },
    [value, submitForm, setFieldValue]
  );
  const handleOnChange = useCallback(
    (event: TextareaChangeEvent) => {
      if (setFieldValue) setFieldValue(name, event.target.value, true);
    },
    [name, setFieldValue]
  );
  return (
    <GVTextField
      {...props}
      onPaste={onPaste}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      showError={false}
      value={value}
      onChange={handleOnChange}
      onKeyDown={handleKeyDown}
      bottomLine={bottomLine}
      wide
      noMargin
      name={name}
      type={"textarea"}
    />
  );
};
