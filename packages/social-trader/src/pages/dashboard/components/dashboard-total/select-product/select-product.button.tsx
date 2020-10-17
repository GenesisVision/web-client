import GVButton from "components/gv-button";
import useIsOpen from "hooks/is-open.hook";
import { SelectProductDialog } from "pages/dashboard/components/dashboard-total/select-product/select-product.dialog";
import React from "react";
import { useTranslation } from "react-i18next";

const _SelectProductButton: React.FC = () => {
  const [t] = useTranslation();
  const [isOpen, setIsOpen, setIsClose] = useIsOpen();
  return (
    <>
      <GVButton onClick={setIsOpen}>
        {t("dashboard-page:select-product.title")}
      </GVButton>
      <SelectProductDialog open={isOpen} onClose={setIsClose} />
    </>
  );
};

export const SelectProductButton = React.memo(_SelectProductButton);
