import classNames from "classnames";
import { MutedText } from "components/muted-text/muted-text";
import * as React from "react";
import { useCallback, useRef } from "react";

import styles from "./gv-checkbox.module.scss";

const _GVCheckbox: React.FC<IGVCheckboxProps> = ({
  setFieldValue,
  touched,
  error,
  name,
  className,
  color,
  value,
  label,
  disabled,
  ...other
}) => {
  const checkbox = useRef<HTMLInputElement>(null);

  const handleBlockClick = useCallback(
    (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.stopPropagation();
      if (setFieldValue) setFieldValue(name, !value, true);
      if (checkbox.current !== null) {
        checkbox.current.click(); // TODO remove it
      }
    },
    [checkbox.current, setFieldValue, name, value]
  );

  return (
    <div className={styles["gv-checkbox-wrapper"]} onClick={handleBlockClick}>
      <div
        className={classNames(styles["gv-checkbox"], className, {
          [styles["gv-checkbox--checked"]]: value,
          [styles["gv-checkbox--primary"]]: color === "primary",
          [styles["gv-checkbox--secondary"]]: color === "secondary",
          [styles["gv-checkbox--disabled"]]: disabled
        })}
      >
        <div className={styles["gv-checkbox__input-wrapper"]}>
          <div>
            {value ? (
              "✔"
            ) : (
              <div className={styles["gv-checkbox__handler"]}>&nbsp;</div>
            )}
          </div>
          <input
            ref={checkbox}
            type="checkbox"
            name={name}
            className={classNames(styles["gv-checkbox__input"])}
            checked={value}
            disabled={disabled}
            {...other}
          />
        </div>
        <div className={styles["gv-checkbox__track"]} />
      </div>
      {label && (
        <div className={styles["gv-checkbox__label"]}>
          <MutedText big>{label}</MutedText>
        </div>
      )}
      {error && <div className={styles["gv-checkbox__error"]}>{error}</div>}
    </div>
  );
};

interface IGVCheckboxProps {
  setFieldValue?: (name: string, value?: any, validate?: boolean) => void;
  name: string;
  className?: string;
  color: string;
  value: any;
  touched?: boolean;
  disabled?: boolean;
  error?: any;
  label: string;
}

const GVCheckbox = React.memo(_GVCheckbox);
export default GVCheckbox;
