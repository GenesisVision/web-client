import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";

import "./style.scss";

export type TextareaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;

export type TextareaKeyDownEvent = React.KeyboardEvent<HTMLTextAreaElement>;
export type TextareaKeyDownEventExtended = TextareaKeyDownEvent & {
  ref: HTMLTextAreaElement;
};

const ROWS_HEIGHT = 22;

interface GVTextAreaProps {
  onKeyDown?: (e: TextareaKeyDownEventExtended) => void;
  ref?: any;
  className?: string;
  textAreaClassName?: string;
  value: string;
  rows?: number;
  onChange: (e: any) => void;
}

const _GVTextArea: React.FC<GVTextAreaProps> = ({
  rows = 1,
  onKeyDown,
  textAreaClassName,
  onChange,
  className,
  value,
  ...otherProps
}) => {
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

  const handleKeyDown = useCallback(
    (event: TextareaKeyDownEvent) => {
      if (onKeyDown && textareaRef.current) {
        onKeyDown({
          ...event,
          ref: textareaRef.current,
          preventDefault: () => event.preventDefault()
        });
      }
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
    },
    [onChange, shadowRef.current, syncHeightWithShadow]
  );

  return (
    <div className={classNames("gv-text-area", textAreaClassName)}>
      <textarea
        className={classNames("gv-text-area__hidden", className)}
        readOnly
        ref={shadowRef}
        rows={rows}
        tabIndex={-1}
        value={value}
      />
      <textarea
        rows={rows}
        className={className}
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
