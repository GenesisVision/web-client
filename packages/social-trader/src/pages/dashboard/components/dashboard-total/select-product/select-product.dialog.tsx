import Dialog, { IDialogOuterProps } from "components/dialog/dialog";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogTop } from "components/dialog/dialog-top";
import Link from "components/link/link";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { ATTACH_ACCOUNT_PAGE_ROUTE } from "pages/attach-account/attach-account.constants";
import { CREATE_ACCOUNT_PAGE_ROUTE } from "pages/create-account/create-account.constants";
import {
  CREATE_FUND_PAGE_ROUTE,
  CREATE_SELF_MANAGED_FUND_PAGE_ROUTE
} from "pages/create-fund/create-fund.constants";
import { CREATE_PROGRAM_PAGE_ROUTE } from "pages/create-program/create-program.constants";
import React from "react";
import { useTranslation } from "react-i18next";

export interface ISelectProductDialogProps extends IDialogOuterProps {}

const PRODUCTS = {
  fund: {
    path: CREATE_FUND_PAGE_ROUTE,
    title: "fund"
  },
  "self-managed-fund": {
    path: CREATE_SELF_MANAGED_FUND_PAGE_ROUTE,
    title: "self-managed-fund"
  },
  program: {
    path: CREATE_PROGRAM_PAGE_ROUTE,
    title: "program"
  },
  "trading-account": {
    path: CREATE_ACCOUNT_PAGE_ROUTE,
    title: "trading-account"
  },
  "attach-external-account": {
    path: ATTACH_ACCOUNT_PAGE_ROUTE,
    title: "attach-external-account"
  }
};

export const SelectProductDialog: React.FC<ISelectProductDialogProps> = props => {
  const { open, onClose } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <SelectProductContainer {...props} />
    </Dialog>
  );
};

const SelectProductContainer: React.FC = () => {
  const [t] = useTranslation();
  return (
    <>
      <DialogTop title={t("dashboard-page:select-product.title")} />
      <DialogBottom fixed={false}>
        <Row>
          <Text muted>{t("dashboard-page:select-product.text")}</Text>
        </Row>
        <Row onlyOffset>
          <div style={{ maxWidth: 500 }}>
            {Object.values(PRODUCTS).map(({ path, title }) => (
              <Row onlyOffset>
                <Row>
                  <Link to={path}>
                    <h5>{t(`dashboard-page:select-product.${title}.title`)}</h5>
                  </Link>
                </Row>
                <Row size={"small"}>
                  <Text muted preWrap>
                    {t(`dashboard-page:select-product.${title}.description`)}
                  </Text>
                </Row>
              </Row>
            ))}
          </div>
        </Row>
      </DialogBottom>
    </>
  );
};
