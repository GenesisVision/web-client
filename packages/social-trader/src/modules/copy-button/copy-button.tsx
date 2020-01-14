import GVButton from "components/gv-button";
import CopyIcon from "components/icon/copy-icon";
import useCopy from "hooks/copy.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

const _CopyButton: React.FC<Props> = ({
  value,
  successMessage,
  text,
  wide
}) => {
  const [t] = useTranslation();
  const copy = useCopy(successMessage);
  const onCopy = useCallback(() => {
    copy(value);
  }, [value]);
  return (
    <GVButton
      wide={wide}
      noPadding={!!text}
      color="secondary"
      onClick={onCopy}
      variant={text ? "text" : undefined}
    >
      <>
        <CopyIcon />
        &nbsp;
        {t("buttons.copy")}
      </>
    </GVButton>
  );
};

interface Props {
  wide?: boolean;
  text?: boolean;
  successMessage?: string;
  value: string;
}

const CopyButton = React.memo(_CopyButton);
export default CopyButton;
