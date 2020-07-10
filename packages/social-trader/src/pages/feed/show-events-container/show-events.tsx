import { Center } from "components/center/center";
import GVSwitch from "components/gv-switch";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  value: boolean;
  isPending?: boolean;
  onChange?: VoidFunction;
}

const _ShowEvents: React.FC<Props> = ({ isPending, value, onChange }) => {
  const [t] = useTranslation();
  return (
    <Center>
      <RowItem size={"small"}>
        <Text wrap={false} muted size={"small"}>
          {t("Show events")}
        </Text>
      </RowItem>
      <RowItem>
        <GVSwitch
          touched={false}
          name={"name"}
          value={value}
          disabled={isPending}
          color="primary"
          onChange={onChange}
        />
      </RowItem>
    </Center>
  );
};

export const ShowEvents = React.memo(_ShowEvents);
