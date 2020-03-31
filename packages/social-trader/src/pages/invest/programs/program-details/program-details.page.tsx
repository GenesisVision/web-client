import { ASSET } from "constants/constants";
import { useAccountCurrency } from "hooks/account-currency.hook";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { statisticCurrencyAction } from "./actions/program-details.actions";
import ProgramDetailsContainer from "./program-details.contaner";
import { programDescriptionSelector } from "./reducers/description.reducer";
import { dispatchPlatformLevelsParameters } from "./service/program-details.service";

const _ProgramDetailsPage: React.FC<Props> = ({ route }) => {
  const dispatch = useDispatch();
  const description = useSelector(programDescriptionSelector);
  const profileCurrency = useAccountCurrency();
  useEffect(() => {
    if (!description) return;
    const { currency } = description.tradingAccountInfo;
    dispatch(dispatchPlatformLevelsParameters(currency || profileCurrency));
    dispatch(statisticCurrencyAction(currency || profileCurrency));
  }, [description]);
  return <ProgramDetailsContainer route={route} data={description!} />;
};

interface Props {
  route: ASSET;
}

const ProgramDetailsPage = React.memo(_ProgramDetailsPage);
export default ProgramDetailsPage;
