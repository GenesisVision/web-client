import { ProgramTransactionDetails } from "gv-api-web";
import * as React from "react";
import GVProgramAvatar, {
  GVProgramAvatarProps
} from "shared/components/gv-program-avatar";
import withUrl from "shared/decorators/with-url";
import { InjectedTranslateProps } from "react-i18next";
import { FormikProps } from "formik";
import { ICustomNotificationCreateFormValues } from "../../asset-notifications/custom-notification-create-form";

interface OwnProps {
  data: ProgramTransactionDetails;
}

interface AddProps {
  alt: string;
}

interface Props extends OwnProps, AddProps, GVProgramAvatarProps {}

const TransactionAsset = (props: OwnProps) => {
  return (
    <div
      className={`transaction-asset transaction-asset--${props.data.programType.toLowerCase()}`}
    >
      <GVProgramAvatar
        url={props.data.logo}
        level={props.data.level > 0 ? props.data.level : undefined}
        alt={props.data.title}
        color={props.data.color}
      />
      <div className="transaction-asset__description">
        <p className="transaction-asset__title">{props.data.title}</p>
        <p className="transaction-asset__trader">{props.data.managerName}</p>
      </div>
    </div>
  );
};

// export default TransactionAsset;

export default withUrl<Props>("url")(TransactionAsset);
