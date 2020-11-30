import {
  GVSwitchContainer,
  GVSwitchError,
  GVSwitchHandler,
  GVSwitchInput,
  GVSwitchInputWrapper,
  GVSwitchLabel,
  GVSwitchSwitchWrapper,
  GVSwitchTrack
} from "components/gv-switch/gv-switch.styles";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import React, { useCallback, useRef } from "react";

interface GVSwitchProps {
  onChange?: any;
  name?: string;
  checked?: boolean;
  color?: string;
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
        <GVSwitchError>{error}</GVSwitchError>
      </RowItem>
    );
  }, []);

  return (
    <GVSwitchContainer>
      {label && (
        <GVSwitchLabel size={"small"} onClick={handleClick}>
          <Text muted size={"large"}>
            {label}
          </Text>
        </GVSwitchLabel>
      )}
      <RowItem>
        <GVSwitchSwitchWrapper
          color={color}
          disabled={disabled}
          onClick={handleClick}
        >
          <GVSwitchInputWrapper checked={!!value}>
            <GVSwitchHandler />
            <GVSwitchInput
              ref={checkbox}
              type="checkbox"
              name={name}
              checked={value}
              onClick={handleInputClick}
              disabled={disabled}
              {...other}
            />
          </GVSwitchInputWrapper>
          <GVSwitchTrack checked={!!value} />
        </GVSwitchSwitchWrapper>
      </RowItem>
      {renderError()}
    </GVSwitchContainer>
  );
};

const GVSwitch = React.memo(_GVSwitch);
export default GVSwitch;
