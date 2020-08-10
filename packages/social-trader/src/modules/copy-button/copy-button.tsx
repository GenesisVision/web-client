import { Button } from "components/button/button";
import CopyIcon from "components/icon/copy-icon";
import { Row } from "components/row/row";
import useCopy from "hooks/copy.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

const _CopyButton: React.FC<Props> = ({ value, text, wide }) => {
  const [t] = useTranslation();
  const { copy, isSuccess } = useCopy();
  const onCopy = useCallback(() => {
    copy(value);
  }, [value]);
  return (
    <Button
      isSuccessful={isSuccess}
      wide={wide}
      noPadding={!!text}
      color="secondary"
      onClick={onCopy}
      variant={text ? "text" : undefined}
    >
      <Row>
        <CopyIcon />
        &nbsp;
        {t("buttons.copy")}
      </Row>
    </Button>
  );
};

interface Props {
  wide?: boolean;
  text?: boolean;
  value: string;
}

const CopyButton = React.memo(_CopyButton);
export default CopyButton;
