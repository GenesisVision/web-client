import { ApiKeysContextProvider } from "components/api-keys/api-keys.context";
import { ASSET } from "constants/constants";
import { LevelsParamsInfo } from "gv-api-web";
import { useAccountCurrency } from "hooks/account-currency.hook";
import ProgramApiKeysContainer from "pages/invest/programs/program-api-keys/program-api-keys.contaner";
import { statisticCurrencyAction } from "pages/invest/programs/program-details/actions/program-details.actions";
import { programDescriptionSelector } from "pages/invest/programs/program-details/reducers/description.reducer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CurrencyEnum } from "utils/types";

const _ProgramDetailsPage: React.FC<Props> = ({ levelsParameters, route }) => {
  const dispatch = useDispatch();
  const description = useSelector(programDescriptionSelector);
  const profileCurrency = useAccountCurrency();
  const [programCurrency, setProgramCurrency] = useState<
    CurrencyEnum | undefined
  >();
  const [programId, setProgramId] = useState<string | undefined>();

  useEffect(() => {
    if (!description) return;
    const { currency } = description.tradingAccountInfo;
    setProgramCurrency(currency);
    setProgramId(description.id);
  }, [description]);
  useEffect(() => {
    dispatch(statisticCurrencyAction(programCurrency || profileCurrency));
  }, [programId]);

  if (!description) return null;

  return (
    <ApiKeysContextProvider>
      <ProgramApiKeysContainer
        levelsParameters={levelsParameters}
        data={description!}
      />
    </ApiKeysContextProvider>
  );
};

interface Props {
  levelsParameters?: LevelsParamsInfo;
  route: ASSET;
}

const ProgramApiKeysPage = React.memo(_ProgramDetailsPage);
export default ProgramApiKeysPage;
