import { ASSET } from "constants/constants";
import { useAccountCurrency } from "hooks/account-currency.hook";
import useApiRequest from "hooks/api-request.hook";
import { fetchLevelParameters } from "pages/invest/programs/program-details/service/program-details.service";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CurrencyEnum } from "utils/types";

import { statisticCurrencyAction } from "./actions/program-details.actions";
import ProgramDetailsContainer from "./program-details.contaner";
import { programDescriptionSelector } from "./reducers/description.reducer";

const _ProgramDetailsPage: React.FC<Props> = ({ route }) => {
  const dispatch = useDispatch();
  const description = useSelector(programDescriptionSelector);
  const profileCurrency = useAccountCurrency();
  const [programCurrency, setProgramCurrency] = useState<
    CurrencyEnum | undefined
  >();
  const [programId, setProgramId] = useState<string | undefined>();

  const {
    data: levelsParameters,
    sendRequest: getLevelsParameters
  } = useApiRequest({
    request: (currency: CurrencyEnum) =>
      fetchLevelParameters(profileCurrency || currency)
  });

  useEffect(() => {
    if (!description) return;
    const { currency } = description.tradingAccountInfo;
    setProgramCurrency(currency);
    setProgramId(description.id);
    getLevelsParameters(currency);
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
  route: ASSET;
}

const ProgramDetailsPage = React.memo(_ProgramDetailsPage);
export default ProgramDetailsPage;
