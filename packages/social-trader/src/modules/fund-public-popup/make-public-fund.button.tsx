import Dialog from "components/dialog/dialog";
import GVButton from "components/gv-button";
import { TableCardActionsItem } from "components/table/components/table-card/table-card-actions";
import useApiRequest from "hooks/api-request.hook";
import useIsOpen from "hooks/is-open.hook";
import { editAsset } from "modules/asset-settings/services/asset-settings.service";
import { IFundPublicFormValues } from "modules/fund-public-popup/components/fund-public-edit-form/fund-public.validators";
import dynamic from "next/dist/next-server/lib/dynamic";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const FundPublicPopup = dynamic(() => import("./components/fund-public-popup"));

interface Props {
  details: any;
  onApply: VoidFunction;
}

const _MakePublicFundCardOption: React.FC<Props> = ({ details, onApply }) => {
  const { sendRequest } = useApiRequest({
    middleware: [onApply],
    request: editAsset,
    successMessage: "fund-settings:make-public-fund-form.success-alert-message"
  });
  const [isOpenPopup, setIsOpenPopup, setIsClosePopup] = useIsOpen();
  const [t] = useTranslation();
  const handleOnSubmit = useCallback((values: IFundPublicFormValues) => {
    sendRequest({ ...details, ...values });
  }, []);
  return (
    <>
      <TableCardActionsItem onClick={setIsOpenPopup}>
        {t("dashboard-page:trading.actions.make-public-fund")}
      </TableCardActionsItem>
      <Dialog open={isOpenPopup} onClose={setIsClosePopup}>
        <FundPublicPopup
          onSubmit={handleOnSubmit}
          name={details.publicInfo.title}
        />
      </Dialog>
    </>
  );
};

export const MakePublicFundCardOption = React.memo(_MakePublicFundCardOption);

interface IMakePublicFundButtonProps {
  onSubmit: (values: IFundPublicFormValues) => any;
  name: string;
}

const _MakePublicFundButton: React.FC<IMakePublicFundButtonProps> = ({
  name,
  onSubmit
}) => {
  const [isOpenPopup, setIsOpenPopup, setIsClosePopup] = useIsOpen();
  const [t] = useTranslation();

  const handleOnSubmit = useCallback((values: IFundPublicFormValues) => {
    return onSubmit(values).then(setIsClosePopup);
  }, []);

  return (
    <>
      <GVButton onClick={setIsOpenPopup}>
        {t("dashboard-page:trading.actions.make-public-fund")}
      </GVButton>
      <Dialog open={isOpenPopup} onClose={setIsClosePopup}>
        <FundPublicPopup onSubmit={handleOnSubmit} name={name} />
      </Dialog>
    </>
  );
};

export const MakePublicFundButton = React.memo(_MakePublicFundButton);
