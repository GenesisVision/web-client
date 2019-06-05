import { OrderSignalProgramInfo } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";

const _ProviderFees: React.FC<Props> = ({ provider, isOnlyOne, t }) => {
  const { program, fees } = provider;
  return (
    <div className="provider-fees">
      {!isOnlyOne ? (
        <div className="provider-fees__avatar">
          <AssetAvatar
            url={program.logo}
            alt={program.title}
            color={program.color}
          />
          {program.title}
        </div>
      ) : null}
      {fees.map(fee => {
        return (
          <div key={fee.type} className="provider-fees__item">
            {t(`investor.copytrading-tables.fees.${fee.type}`, fee)}
          </div>
        );
      })}
    </div>
  );
};

export const ProviderFees = translate()(_ProviderFees);

type Props = InjectedTranslateProps & {
  provider: OrderSignalProgramInfo;
  isOnlyOne: boolean;
};
