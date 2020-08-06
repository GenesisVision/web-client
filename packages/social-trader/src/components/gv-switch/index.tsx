import clsx from "clsx";
import { Center } from "components/center/center";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import React, { useCallback, useRef } from "react";

import styles from "./style.module.scss";

interface GVSwitchProps {
  onChange?: any;
  name?: string;
  checked?: boolean;
  color?: string;
  className?: string;
  touched: boolean;
  value: boolean;
  error?: string;
  label?: string | React.ReactNode;
  disabled?: boolean;
}

const _GVSwitch: React.FC<GVSwitchProps> = ({
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

  const handleClick = useCallback(
    (e: any) => {
      if (checkbox.current !== null) {
        e.stopPropagation();
        checkbox.current.click();
      }
    },
    [checkbox.current]
  );

  const handleInputClick = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  const renderError = useCallback(() => {
    if (!touched || !error) return null;
    return (
      <RowItem>
        <span className={styles["gv-switch__error"]}>{error}</span>
      </RowItem>
    );
  }, []);

  return (
    <Center className={styles["gv-switch-wrapper"]}>
      {label && (
        <RowItem
          size={"small"}
          className={styles["gv-switch__label"]}
          onClick={handleClick}
        >
          <Text muted size={"large"}>
            {label}
          </Text>
        </RowItem>
      )}
      <RowItem>
        <span
          className={clsx(styles["gv-switch"], className, {
            [styles["gv-switch--checked"]]: value,
            [styles["gv-switch--primary"]]: color === "primary",
            [styles["gv-switch--secondary"]]: color === "secondary",
            [styles["gv-switch--disabled"]]: disabled
          })}
          onClick={handleClick}
        >
          <span className={styles["gv-switch__input-wrapper"]}>
            <span className={styles["gv-switch__handler"]} />
            <input
              ref={checkbox}
              type="checkbox"
              name={name}
              className={styles["gv-switch__input"]}
              checked={value}
              onClick={handleInputClick}
              disabled={disabled}
              {...other}
            />
          </span>
          <span className={styles["gv-switch__track"]} />
        </span>
      </RowItem>
      {renderError()}
    </Center>
  );
};

const GVSwitch = React.memo(_GVSwitch);
export default GVSwitch;
