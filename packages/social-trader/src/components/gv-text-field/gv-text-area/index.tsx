import classNames from "classnames";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback, useEffect, useRef, useState } from "react";

import styles from "./style.module.scss";

export type TextareaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;

export type TextareaKeyDownEvent = React.KeyboardEvent<HTMLTextAreaElement>;
export type TextareaKeyDownEventExtended = TextareaKeyDownEvent & {
  ref: HTMLTextAreaElement;
};

const ARROW_KEYS = [37, 38, 39, 40];
const CHANGE_CARET_KEYS = [...ARROW_KEYS];

const ROWS_HEIGHT = 22;

interface GVTextAreaProps {
  outerCaret?: number;
  onChangeCaret?: (position: number) => void;
  onKeyDown?: (e: TextareaKeyDownEventExtended) => void;
  ref?: any;
  className?: string;
  textAreaClassName?: string;
  value: string;
  rows?: number;
  onChange: (e: any) => void;
}

const _GVTextArea: React.FC<GVTextAreaProps> = ({
  outerCaret,
  onChangeCaret,
  rows = 1,
  onKeyDown,
  textAreaClassName,
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
    <div className={classNames(styles["gv-text-area"], textAreaClassName)}>
      <textarea
        className={classNames(
          styles["gv-text-area__hidden"],
          styles["gv-text-area__gv-text-field"],
          className
        )}
        readOnly
        ref={shadowRef}
        rows={rows}
        tabIndex={-1}
        value={value}
      />
      <textarea
        onClick={handleClick}
        rows={rows}
        className={classNames(styles["gv-text-area__gv-text-field"], className)}
        value={value}
        ref={textareaRef}
        style={{ height }}
        onChange={handleChange}
        {...otherProps}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

const GVTextArea = React.memo(_GVTextArea);
export default GVTextArea;
