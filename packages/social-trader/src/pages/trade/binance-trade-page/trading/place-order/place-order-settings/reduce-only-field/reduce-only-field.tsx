import GVCheckbox from "components/gv-checkbox/gv-checkbox";
import { GVHookFormField } from "components/gv-hook-form-field";
import React from "react";
import { useTranslation } from "react-i18next";

import { TRADE_FORM_FIELDS } from "../../place-order.types";

const _ReduceOnlyField: React.FC = () => {
  const [t] = useTranslation();
  return (
    <GVHookFormField
      size={"small"}
      type="checkbox"
      name={TRADE_FORM_FIELDS.reduceOnly}
      label={t("Reduce only")}
      component={GVCheckbox}
    />
  );
};

export const ReduceOnlyField = React.memo(_ReduceOnlyField);
