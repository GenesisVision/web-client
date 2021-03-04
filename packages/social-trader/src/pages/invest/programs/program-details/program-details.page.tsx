import { ASSET } from "constants/constants";
import { LevelsParamsInfo } from "gv-api-web";
import { useAccountCurrency } from "hooks/account-currency.hook";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CurrencyEnum } from "utils/types";

import { statisticCurrencyAction } from "./actions/program-details.actions";
import ProgramDetailsContainer from "./program-details.container";
import { programDescriptionSelector } from "./reducers/description.reducer";

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
    <ProgramDetailsContainer
      levelsParameters={levelsParameters}
      route={route}
      data={description!}
    />
  );
};

interface Props {
  levelsParameters?: LevelsParamsInfo;
  route: ASSET;
}

const ProgramDetailsPage = React.memo(_ProgramDetailsPage);
export default ProgramDetailsPage;
