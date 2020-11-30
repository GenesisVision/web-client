import useIsOpen from "hooks/is-open.hook";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

export type TextareaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;

export type TextareaKeyDownEvent = React.KeyboardEvent<HTMLTextAreaElement>;
export type TextareaKeyDownEventExtended = TextareaKeyDownEvent & {
  ref: HTMLTextAreaElement;
};

interface GVTextAreaProps {
  focusTrigger?: any;
  outerCaret?: number;
  onChangeCaret?: (position: number) => void;
  onKeyDown?: (e: TextareaKeyDownEventExtended) => void;
  ref?: any;
  className?: string;
  value: string;
  rows?: number;
  onChange: (e: any) => void;
}

const ARROW_KEYS = [37, 38, 39, 40];
const CHANGE_CARET_KEYS = [...ARROW_KEYS];

const ROWS_HEIGHT = 22;

const Wrapper = styled.div`
  &,
  & textarea {
    overflow: hidden;
  }
  width: 100%;
`;

const Field = styled.textarea`
  box-sizing: border-box !important;
  resize: none;
  width: 100%;
`;

const HiddenField = styled(Field)`
  overflow: hidden;
  visibility: hidden;
  position: absolute;
  height: auto;
  white-space: pre-wrap;
`;

const _GVTextArea: React.FC<GVTextAreaProps> = ({
  focusTrigger,
  outerCaret,
  onChangeCaret,
  rows = 1,
  onKeyDown,
  onChange,
  className,
  value,
  ...otherProps
}) => {
  const [isCaretChange, setCaretChanged, setCaretNotChanged] = useIsOpen();
  const shadowRef = useRef<HTMLTextAreaElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [height, setHeight] = useState(rows * ROWS_HEIGHT);

  const syncHeightWithShadow = () => {
    const shadowRefElem = shadowRef.current;
    if (!shadowRefElem) return;
    const lineHeight = parseFloat(
      window.getComputedStyle(shadowRefElem).lineHeight ||
        ROWS_HEIGHT.toString()
    );
    const newHeight = Math.max(shadowRefElem.scrollHeight, lineHeight);
    if (Math.abs(height - newHeight) > 1) {
      setHeight(newHeight);
    }
  };

  useEffect(() => {
    syncHeightWithShadow();
  }, [value, syncHeightWithShadow]);

  useEffect(() => {
    if (textareaRef.current && isCaretChange) {
      onChangeCaret && onChangeCaret(textareaRef.current.selectionEnd);
      setCaretNotChanged();
    }
  }, [isCaretChange, textareaRef.current, onChangeCaret]);

  useEffect(() => {
    if (textareaRef.current && outerCaret) {
      textareaRef.current.focus();
      textareaRef.current.selectionEnd = outerCaret;
      textareaRef.current.selectionStart = outerCaret;
      setCaretChanged();
    }
  }, [outerCaret]);

  useEffect(() => {
    if (focusTrigger !== undefined && textareaRef.current) {
      const focusInput = () => {
        textareaRef.current!.focus && textareaRef.current!.focus();
      };
      if (typeof setImmediate !== "undefined") setImmediate(focusInput);
      else focusInput();
    }
  }, [focusTrigger, textareaRef.current]);

  const handleKeyDown = useCallback(
    (event: TextareaKeyDownEvent) => {
      if (onKeyDown && textareaRef.current) {
        onKeyDown({
          ...event,
          ref: textareaRef.current,
          preventDefault: () => event.preventDefault()
        });
      }
      if (CHANGE_CARET_KEYS.includes(event.keyCode)) setCaretChanged();
    },
    [onKeyDown, textareaRef.current]
  );

  const handleChange = useCallback(
    (event: TextareaChangeEvent) => {
      const value = event.target.value;
      if (shadowRef.current) {
        shadowRef.current.value = value;
        syncHeightWithShadow();
      }
      if (onChange) onChange(event);
      setCaretChanged();
    },
    [onChange, shadowRef.current, syncHeightWithShadow]
  );

  const handleClick = useCallback(() => {
    setCaretChanged();
  }, []);

  return (
    <Wrapper>
      <HiddenField
        className={className}
        readOnly
        ref={shadowRef}
        rows={rows}
        tabIndex={-1}
        value={value}
      />
      <Field
        className={className}
        onClick={handleClick}
        rows={rows}
        value={value}
        ref={textareaRef}
        style={{ height }}
        onChange={handleChange}
        {...otherProps}
        onKeyDown={handleKeyDown}
      />
    </Wrapper>
  );
};

const GVTextArea = React.memo(_GVTextArea);
export default GVTextArea;
